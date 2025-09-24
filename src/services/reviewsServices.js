import { query } from "../db.js";

/** Reviews list by film */
export async function listReviewsByFilmId(
  filmId,
  { limit = 50, offset = 0 } = {}
) {
  //On vérifie que film ID est un nombre entier supérieur à 0
  if (!Number.isInteger(filmId) || filmId <= 0) {
    const err = new Error("filmId invalide");
    err.status = 400;
    throw err;
  }
  //on créé la requête sql
  const sql = `SELECT *
  FROM reviews
  WHERE film_id = $1
  ORDER BY created_at DESC
  LIMIT $2 OFFSET $3
  `;
  // On créé notre ligne qui contient la requête sql et qui a en paramètre filmId, limit et offset
  const { rows } = await query(sql, [filmId, limit, offset]);
  // si il n'y a pas de ligne, renvoie une erreur
  if (rows.length === 0) {
    const err = new Error("Aucune reviews n'a été trouvé");
    err.status = 404;
    throw err;
  }
  // On retourne nos lignes
  return rows;
}

/** Create a Review */
export async function createNewReview(filmId, { author, rating, comment }) {
  // On vérifie que le filmId est un entier supérieur à 0
  if (!Number.isInteger(filmId) || filmId <= 0) {
    const err = new Error("filmId invalide");
    err.status = 400;
    throw err;
  }
  // On vérifie que author est une chaine de caractère valide une fois trim()
  if (typeof author !== "string" || author.trim() === "") {
    const err = new Error(
      "author ne comporte pas une chaine de caractère valide"
    );
    err.status = 400;
    throw err;
  }
  //On vérifie que comment est une chaine de caractère valide une fois trim()
  if (typeof comment !== "string" || comment.trim() === "") {
    const err = new Error(
      "comment ne comporte pas une chaine de caractère valide"
    );
    err.status = 400;
    throw err;
  }
  //On vérifie que le rating est bien un nombre en entier compris entre 0 et 5
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    const err = new Error(
      "rating doit être un nombre entier compris entre 0 et 5 "
    );
    err.status = 400;
    throw err;
  }
  //on définit le corp de la requête sql en incluant film_id dans l'INSERT et utiliser 4 placeholders
  const sql = `
  INSERT INTO reviews (film_id, author, rating, comment)
  VALUES ($1, $2, $3, $4)
  RETURNING id, film_id, author, rating, comment, created_at
  `;
  //On définit une variable pour nos paramètres envoyé à la requête
  const params = [filmId, author.trim(), rating, comment.trim()];
  try {
    //construit la ligne avec les paramètres sql et les valeurs de ces derniers
    const { rows } = await query(sql, params);
    //retourne la ligne à insérer
    return rows[0];
  } catch (error) {
    // Code qui renvoie une erreur si le film_id ne correspond à rien
    if (error.code === "23503") {
      const err = new Error("Le film spécifié n'existe pas.");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

/** Remove a review */
export async function removeReview(id) {
  // On vérifie que l'id est un nombre entier
  const reviewId = Number(id);
  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    const err = new Error("Id invalide");
    err.status = 400;
    throw err;
  }
  //On définit le corps de la requête sql en ajoutant un placeholder
  const sql = `DELETE FROM reviews
  WHERE id = $1
  RETURNING author, rating, comment
  `;
  //on construit la ligne avec les paramètres sql et l'id
  const { rows } = await query(sql, [reviewId]);

  //On ajoute une condition si on a pas de ligne ajouté
  if (rows.length === 0) {
    const err = new Error("Aucun commentaire n'a été trouvé");
    err.status = 400;
    throw err;
  }
  //On retourne la ligne à inserer
  return rows[0];
}
