import { Router } from "express";
import {
  getListFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/filmsController.js";

const router = Router();

router.get("/", getListFilms);
router.get("/:id", getFilm);
router.post("/", createFilm);
router.put("/:id", updateFilm);
router.delete("/:id", deleteFilm);

export default router;
