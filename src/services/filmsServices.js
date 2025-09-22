import { query } from "../db.js";
// TODO: écrire les requêtes SQL et la logique
export async function listFilms({ limit = 50, offset = 0 } = {}) {
  const { rows } = await query(
    "SELECT id, title, director, year, genre FROM films ORDER BY id ASC LIMIT $1 OFFSET $2;",
    [limit, offset]
  );
  return rows;
}

export async function getFilmById(id) {
  const sql =
    "SELECT id, title, genre, director, year FROM films WHERE id = $1";
  const rows = await query(sql, [id]);
  return rows;
}
// export async function createFilm({ title, director, year, genre }) {}
// export async function updateFilm(
//   id,
//   patch /* { title?, director?, year?, genre? } */
// ) {}
// export async function deleteFilm(id) {}
