BEGIN;

CREATE DATABASE IF NOT EXISTS archexample;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS bugs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    project VARCHAR(255),
    severity VARCHAR(255),
    description TEXT,
    reporter UUID NOT NULL,
    handler UUID NOT NULL,
    status INT VARCHAR(255),
    FOREIGN KEY (reporter) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (handler) REFERENCES users(id) ON DELETE CASCADE
);

COMMIT;