-- migrate:up
CREATE TABLE pogs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    ticker_symbol VARCHAR(255),
    price INT,
    color VARCHAR(255),
    previous_price INT,
    user_id INT
)
-- migrate:down
DROP TABLE pogs