import { listReviewsByFilmId } from "../services/reviewsServices.js";

// TODO: lister les critiques d'un film
export async function listReviews(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      const err = new Error("Paramètre 'id' invalide");
      err.status = 400;
      throw err;
    }
    const reviewsList = await listReviewsByFilmId(id);
    res.status(200).json(reviewsList);
  } catch (error) {
    next(error);
  }
}
// TODO: créer une critique liée à un film

// TODO: supprimer une critique
