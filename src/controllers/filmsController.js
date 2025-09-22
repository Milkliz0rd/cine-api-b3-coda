import { listFilms } from "../services/filmsServices.js";

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
// module.exports.getFilmById = async (req, res) => {};
// // TODO: créer un film
// module.exports.createFilm = async (req, res) => {};
// // TODO: mettre à jour un film
// module.exports.updateFilm = async (req, res) => {};
// // TODO: supprimer un film
// module.exports.deleteFilm = async (req, res) => {};
