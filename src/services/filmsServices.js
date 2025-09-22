// TODO: écrire les requêtes SQL et la logique
export async function listFilms({ limit = 50, offset = 0 } = {}) {}
export async function getFilmById(id) {}
export async function createFilm({ title, director, year, genre }) {}
export async function updateFilm(
  id,
  patch /* { title?, director?, year?, genre? } */
) {}
export async function deleteFilm(id) {}
