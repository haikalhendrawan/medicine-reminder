// src/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const openDb = async () => {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
};

export const initDb = async () => {
  const db = await openDb();
  
  // Tabel User
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      dob TEXT,
      phone_number TEXT
    )
  `);

  // Tabel Obat (Mapping ke User via user_id)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS medicines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      doses_per_day INTEGER,
      dose_times TEXT,
      photo_link TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
  
  console.log("Database initialized & tables ready.");
};