import { Router } from "express";
import {
  getListFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/filmsController.js";

const router = Router();
/**
 * @swagger
 * /films:
 *   get:
 *     summary: Afficher une liste de films
 *     tags: [Films]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *         description: Nombre d’éléments à retourner
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Décalage pour la pagination
 *     responses:
 *       "200":
 *         description: Une liste de films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: F1
 *                     director:
 *                       type: string
 *                       example: Joseph Kosinski
 *                     year:
 *                       type: integer
 *                       example: 2025
 *                     genre:
 *                       type: string
 *                       example: Action/Sport
 */

router.get("/", getListFilms);
router.get("/:id", getFilm);
router.post("/", createFilm);
router.patch("/:id", updateFilm);
router.delete("/:id", deleteFilm);

export default router;
