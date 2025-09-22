import { Router } from "express";
import { listFilms, getFilm, createFilm, updateFilm, deleteFilm } from "../controllers/filmsController.js";

const router = Router();

router.get("/", listFilms);
router.get("/:id", getFilm);
router.post("/", createFilm);
router.put("/:id", updateFilm);
router.delete("/:id", deleteFilm);

export default router;
