import { db } from "./db.mjs";

// Uncomment the following lines if you need to drop existing tables
// await db.run('DROP TABLE IF EXISTS users');
// await db.run('DROP TABLE IF EXISTS entries');

await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT(100) NOT NULL)');
await db.run('CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, date TIMESTAMP NOT NULL, title TEXT(100) NOT NULL, body TEXT NOT NULL, quote TEXT NOT NULL)');

await db.close();