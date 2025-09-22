import { query } from "../db.js";
import { listFilms, getFilmById } from "../services/filmsServices.js";

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
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "id invalide" });

    console.log(typeof id, id);
    const film = await getFilmById(id);
    if (!film) return res.status(404).json({ error: "film non trouvé" });

    res.status(200).json(film);
  } catch (error) {
    next(error);
  }
}
// // TODO: créer un film
// module.exports.createFilm = async (req, res) => {};
// // TODO: mettre à jour un film
// module.exports.updateFilm = async (req, res) => {};
// // TODO: supprimer un film
// module.exports.deleteFilm = async (req, res) => {};
