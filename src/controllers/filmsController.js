import {
  listFilms,
  getFilmById,
  postFilm,
  majFilm,
  remFilm,
} from "../services/filmsServices.js";

// TODO: lister les films
export async function getListFilms(req, res, next) {
  try {
    // retour du service dans une variable
    const films = await listFilms();
    // status 200 avec les films en json
    res.status(200).json(films);
  } catch (error) {
    next(error);
  }
}
// // TODO: récupérer un film par id
export async function getFilm(req, res, next) {
  try {
    // récupère l'objet id dans les paramètres
    const { id } = req.params;
    // retour du service dans une variable
    const filmById = await getFilmById(id);
    // retour si film non trouvé
    if (!filmById) return res.status(404).json({ error: "film non trouvé" });
    res.status(200).json(filmById);
  } catch (error) {
    next(error);
  }
}
// // TODO: créer un film
export async function createFilm(req, res, next) {
  try {
    // récupère les objets dans le body
    const { title, director, year, genre } = req.body;
    // retour du service avec les objets dans une variable
    const newFilm = await postFilm({ title, director, year, genre });
    // réponse avec un message
    res.status(200).json({ message: "Film créé avec succès !", film: newFilm });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    next(error);
  }
}
// // TODO: mettre à jour un film
export async function updateFilm(req, res, next) {
  try {
    // récupère l'objet id dans les paramètres
    const { id } = req.params;
    // retour du service dans une variable et les objets modifié
    const filmUpdated = await majFilm(id, req.body);
    // réponse avec un message
    res
      .status(200)
      .json({ message: "Film modifié avec succés !", film: filmUpdated });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    next(error);
  }
}
// // TODO: supprimer un film
export async function deleteFilm(req, res, next) {
  try {
    // récupère l'objet id dans les paramètres
    const { id } = req.params;
    // retour du service dans une variable
    const deletedfilm = await remFilm(id);
    // réponse avec un message
    res
      .status(200)
      .json({ message: "film supprimé avec succès", film: deletedfilm });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    next(error);
  }
}
