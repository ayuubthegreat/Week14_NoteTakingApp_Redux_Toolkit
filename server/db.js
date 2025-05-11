import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const DB_PATH = path.join(__dirname, "notes.db");

// Custom error class for database errors
export class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

let db = null;

// Create and initialize the database connection
export async function createDatabase() {
  try {
    // Ensure the database file exists
    if (!fs.existsSync(DB_PATH)) {
      console.log(`Creating database file at ${DB_PATH}`);
      fs.writeFileSync(DB_PATH, "");
    }

    // Open the database
    db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });

    // Enable foreign keys
    await db.exec("PRAGMA foreign_keys = ON");

    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT
      )
    `);

    // Create index for faster queries
    await db.exec(
      "CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(createdAt)"
    );

    return db;
  } catch (error) {
    throw new DatabaseError(`Failed to initialize database: ${error.message}`);
  }
}

// Get database connection
export async function getDbConnection() {
  if (!db) {
    try {
      db = await open({
        filename: DB_PATH,
        driver: sqlite3.Database,
      });
    } catch (error) {
      throw new DatabaseError(
        `Failed to connect to database: ${error.message}`
      );
    }
  }
  return db;
}

// Close database connection
export async function closeDatabase() {
  if (db) {
    try {
      await db.close();
      db = null;
    } catch (error) {
      throw new DatabaseError(`Failed to close database: ${error.message}`);
    }
  }
}
