import { Router } from "express";
import {
  listReviews,
  createReview,
  deleteReview,
} from "../controllers/reviewsController.js";

const router = Router();

router.get("/films/:id/reviews", listReviews);
router.post("/films/:id/reviews", createReview);
router.delete("/:id", deleteReview);

export default router;
