import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middleware/errorHandler.js";
import filmsRouter from "./routes/films.js";
import reviewsRouter from "./routes/reviews.js";
import { openApiSpec } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Healthcheck
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Routes REST
app.use("/films", filmsRouter);
app.use("/reviews", reviewsRouter);

// 404 pour routes inconnues
app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Middleware global d'erreurs
app.use(errorHandler);

export default app;
