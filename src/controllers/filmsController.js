import { query } from "../db.js";
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
    const films = await listFilms();
    res.status(200).json(films);
  } catch (error) {
    next(error);
  }
}
// // TODO: récupérer un film par id
export async function getFilm(req, res, next) {
  try {
    const { id } = req.params;
    const filmById = await getFilmById(id);
    if (!filmById) return res.status(404).json({ error: "film non trouvé" });
    res.status(200).json(filmById);
  } catch (error) {
    next(error);
  }
}
// // TODO: créer un film
export async function createFilm(req, res, next) {
  try {
    const { title, director, year, genre } = req.body;
    const newFilm = await postFilm({ title, director, year, genre });
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
    const { id } = req.params;
    const filmUpdated = await majFilm(id, req.body);
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
    const { id } = req.params;
    const deletedfilm = await remFilm(id);
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
