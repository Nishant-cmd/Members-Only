const { Client } = require('pg');
const path = require('node:path');
const { loadEnvFile } = require('node:process');
loadEnvFile(path.join(__dirname, '../.env'));

const SQL = `

DO $$
BEGIN
    CREATE TYPE membership_status AS ENUM (
        'PENDING',
        'ACTIVE',
        'REJECTED'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
status membership_status DEFAULT 'PENDING',
is_admin BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL ,
    created_at timestamp NOT NULL
);

`;

async function initializeDatabase() {
  console.log('Seeding Database');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Database initalization complete');
}

initializeDatabase();
