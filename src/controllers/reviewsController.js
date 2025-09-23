import {
  createNewReview,
  listReviewsByFilmId,
} from "../services/reviewsServices.js";

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

export async function createReview(req, res, next) {
  try {
    //Id doit être requis dans les params et entier
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      const err = new Error("Paramètre 'id' invalide");
      err.status = 400;
      throw err;
    }
    //On vérifie que lon a bien du body dans notre requête
    if (req.body == null) {
      const err = new Error("Requête sans body JSON");
      err.status = 400;
      throw err;
    }
    //On récupère nos valeurs
    const rating = Number(req.body.rating);
    const author = req.body.author;
    const comment = req.body.comment;

    // on appel notre services
    const newReview = await createNewReview(id, { author, rating, comment });
    // renvoie un status 201 et un message de validation
    res.status(201).json({
      message: "Votre commentaire a bien été posté !",
      review: newReview,
    });
  } catch (error) {
    // en cas d'erreur:
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    next(error);
  }
}
// TODO: créer une critique liée à un film

// TODO: supprimer une critique
