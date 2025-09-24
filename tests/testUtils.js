import { pool, query } from "../src/db.js";

// Vider les tables dans un ordre sûr (attention aux FK)
export async function resetDb() {
  await query("TRUNCATE TABLE reviews RESTART IDENTITY CASCADE;");
  await query("TRUNCATE TABLE films RESTART IDENTITY CASCADE;");
}

export async function seedFilms(data = []) {
  for (const f of data) {
    await query(
      "INSERT INTO films (title, director, year, genre) VALUES ($1, $2, $3, $4);",
      [f.title, f.director, f.year, f.genre]
    );
  }
}

// Fermer la pool en fin de test run
export async function closeDb() {
  await pool.end();
}
