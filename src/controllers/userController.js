import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByEmailService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { koii_main_account_pubkey, email, last_distribution_at} = req.body;
  try {
    const newUser = await createUserService(koii_main_account_pubkey, email, last_distribution_at);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

const DAY_PERIOD_FOR_NEXT_DISTRIBUTION = 7;
const ONE_DAY_MILISECONDS = 1000 * 60 * 60 * 24;

export const validateDistribution = async (req, res, next) => {
  const { koii_main_account_pubkey, email} = req.body;
  try {
    const user = await getUserByEmailService(email);
    if (!user) {
      //create user
      const newUser = await createUserService(koii_main_account_pubkey, email, new Date(0));
      handleResponse(res, 200, "User can distribute", {
        distributable: true,
        ...newUser,
      });
    } else {
      const lastDistributed = new Date(user.last_distribution_at);
      const now = new Date();
      const diff = now.getTime() - lastDistributed.getTime();
      const diffDays = Math.ceil(diff / ONE_DAY_MILISECONDS);
      if (diffDays >= DAY_PERIOD_FOR_NEXT_DISTRIBUTION) {
        handleResponse(res, 200, "User can distribute", {
          distributable: true,
          ...user,
        });
      } else {
        handleResponse(res, 200, "User cannot distribute", {
          distributable: false,
          ...user,
        });
      }
    }
  } catch (err) {
    next(err);
  }
}


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const user = await getUserByEmailService(req.params.email);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { koii_main_account_pubkey, email, last_distribution_at } = req.body;
  try {
    const updatedUser = await updateUserService(req.params.id, koii_main_account_pubkey, email, last_distribution_at);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", deleteUser);
  } catch (err) {
    next(err);
  }
};
