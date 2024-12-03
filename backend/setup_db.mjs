import { db } from "./db.mjs";

// await db.run('DROP TABLE users');
// await db.run('DROP TABLE entries');

await db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT(100) NOT NULL)');
await db.run('CREATE TABLE entries (id INTEGER PRIMARY KEY, date TIMESTAMP NOT NULL, ' + 
    'title TEXT(100) NOT NULL, body TEXT NOT NULL)');


await db.close();