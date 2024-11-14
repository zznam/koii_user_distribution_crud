import Joi from "joi";

const API_SECRET = process.env.API_SECRET;

const userScheme = Joi.object({
  koii_main_account_pubkey: Joi.string().min(40).required(), // 256-bit ed25519 public key encoded as a base-58 string
  email: Joi.string().email().required(),
  last_distribution_at: Joi.date(),
});

const validateUser = (req, res, next) => {
  const { error } = userScheme.validate(req.body);
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== API_SECRET)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized"
    });

  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};

export default validateUser;
