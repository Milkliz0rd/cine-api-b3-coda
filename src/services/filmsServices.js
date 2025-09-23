import { query } from "../db.js";
// TODO: écrire les requêtes SQL et la logique

/** All the films on the DB */
export async function listFilms({ limit = 50, offset = 0 } = {}) {
  const sql =
    "SELECT id, title, director, year, genre FROM films ORDER BY id ASC LIMIT $1 OFFSET $2;";
  const { rows } = await query(sql, [limit, offset]);
  return rows;
}

/** Found a film by ID */
export async function getFilmById(id) {
  const sql =
    "SELECT id, title, genre, director, year FROM films WHERE id = $1";
  const { rows } = await query(sql, [id]);
  return rows[0];
}

/** Create a film */
export async function postFilm({ title, director, year, genre }) {
  if (!title || !director || !year || !genre) {
    const err = new Error("Un des paramètres n'est pas valide");
    err.status = 400;
    throw err;
  }
  const yearInt = Number(year);
  if (!Number.isInteger(yearInt)) {
    const err = new Error("L'année doit être entier");
    err.status = 400;
    throw err;
  }
  const sql =
    "INSERT INTO  films  (title, director, year, genre) VALUES ($1, $2, $3, $4) RETURNING id, title, director, year, genre";
  const values = [title, director, yearInt, genre];
  const { rows } = await query(sql, values);
  return rows[0];
}

/** Mettre à jour un film */
export async function majFilm(id, { title, director, year, genre }) {
  const filmId = Number(id);
  if (!Number.isInteger(filmId)) {
    const err = new Error("ID invalide");
    err.status = 400;
    throw err;
  }
  if (!title || !director || !year || !genre) {
    const err = new Error("Un des paramètres n'est pas valide");
    err.status = 400;
    throw err;
  }
  const yearInt = Number(year);
  if (!Number.isInteger(yearInt)) {
    const err = new Error("L'année doit être entier");
    err.status = 400;
    throw err;
  }

  const sql = `UPDATE films
   SET title = $1, director = $2, year = $3, genre = $4
   WHERE id = $5
   RETURNING id, title, director, year, genre
   `;
  const values = [title, director, yearInt, genre, filmId];
  console.log(values);

  const { rows } = await query(sql, values);

  if (rows.length === 0) {
    const err = new Error("Aucun film n'a été trouvé");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

export async function remFilm(id) {
  const filmId = Number(id);
  if (!Number.isInteger(filmId)) {
    const err = new Error("ID invalide");
    err.status = 400;
    throw err;
  }
  const sql = ` DELETE FROM films
  WHERE id = $1
  RETURNING title, director, year, genre
  `;
  const values = [filmId];

  const { rows } = await query(sql, values);

  if (rows.length === 0) {
    const err = new Error("Aucun film n'a été trouvé");
    err.status = 404;
    throw err;
  }
  return rows[0];
}
