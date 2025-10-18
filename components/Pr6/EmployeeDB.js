import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "SuperHeroes.db";
const database_version = "1.0";
const database_displayname = "Super Heroes Database";
const database_size = 200000;

let db;

export const initDB = async () => {
  try {
    db = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    );

    // Создаем таблицу, если она еще не существует
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS heroes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        alias TEXT,
        superpower TEXT,
        origin TEXT
      );
    `);
    console.log("Database initialized");
  } catch (error) {
    console.log("Error initializing database:", error);
  }
};

export const addHero = async (name, alias, superpower, origin) => {
  try {
    await db.executeSql(
      `INSERT INTO heroes (name, alias, superpower, origin) VALUES (?, ?, ?, ?)`,
      [name, alias, superpower, origin]
    );
  } catch (error) {
    console.log("Error adding hero:", error);
  }
};

export const getHeroes = async () => {
  try {
    const [results] = await db.executeSql(`SELECT * FROM heroes`);
    const heroes = [];
    for (let i = 0; i < results.rows.length; i++) {
      heroes.push(results.rows.item(i));
    }
    return heroes;
  } catch (error) {
    console.log("Error fetching heroes:", error);
    return [];
  }
};

export const updateHero = async (id, name, alias, superpower, origin) => {
  try {
    await db.executeSql(
      `UPDATE heroes SET name = ?, alias = ?, superpower = ?, origin = ? WHERE id = ?`,
      [name, alias, superpower, origin, id]
    );
  } catch (error) {
    console.log("Error updating hero:", error);
  }
};

export const deleteHero = async (id) => {
  try {
    await db.executeSql(`DELETE FROM heroes WHERE id = ?`, [id]);
  } catch (error) {
    console.log("Error deleting hero:", error);
  }
};
