import { query } from "../db.js";

export async function listReviewsByFilmId(
  filmId,
  { limit = 50, offset = 0 } = {}
) {
  if (!Number.isInteger(filmId) || filmId <= 0) {
    const err = new Error("filmId invalide");
    err.status = 400;
    throw err;
  }

  const sql = `SELECT *
  FROM reviews
  WHERE film_id = $1
  ORDER BY created_at DESC
  LIMIT $2 OFFSET $3
  `;
  const { rows } = await query(sql, [filmId, limit, offset]);
  if (rows.length === 0) {
    const err = new Error("Aucune reviews n'a été trouvé");
    err.status = 404;
    throw err;
  }
  return rows;
}

// export async function createReview(filmId, { author, rating, comment }) {}
// export async function deleteReview(id) {}
