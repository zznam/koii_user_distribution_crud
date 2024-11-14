CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    koii_main_account_pubkey VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    last_distribution_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
)