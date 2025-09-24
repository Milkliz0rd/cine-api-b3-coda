export const options = {
  openapi: "3.0.3",
  info: {
    title: "Films API",
    version: "1.0.0",
    description: "API de gestion des films (exemple)",
  },
  servers: [
    { url: "http://localhost:3000/api-docs" }, // adapte si besoin
  ],
  tags: [
    { name: "Films", description: "Gestion des films" },
    { name: "Reviews", description: "Gestion des commentaires" },
  ],
  components: {
    schemas: {
      Film: {
        type: "object",
        required: ["id", "title", "director", "year", "genre"],
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "F1" },
          director: { type: "string", example: "Joseph Kosinski" },
          year: { type: "integer", example: 2025 },
          genre: { type: "string", example: "Action/Sport" },
        },
      },
      Review: {
        type: "object",
        required: ["id", "film_id", "author", "rating", "comment"],
        properties: {
          id: { type: "integer", example: 1 },
          film_id: { type: "integer", example: "1" },
          author: { type: "string", example: "John Doe" },
          rating: { type: "integer", example: 4 },
          Comment: { type: "string", example: "Great movie" },
          created_at: {
            type: "string",
            format: "date-time",
            readOnly: true,
            description:
              "Horodatage de création (défini par le serveur, ISO 8601).",
            example: "2025-09-24T09:12:34Z",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          status: { type: "integer", example: 400 },
          message: { type: "string", example: "Invalid input" },
        },
      },
    },
  },
  paths: {
    // ⚠️ Suppose que ton router est monté avec app.use("/films", router)
    // Si tu montes à la racine, remplace /films par / et /films/{id} par /{id}
    "/films": {
      get: {
        tags: ["Films"],
        summary: "Afficher une liste de films",
        parameters: [
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", minimum: 1, default: 20 },
            description: "Nombre d’éléments à retourner",
          },
          {
            in: "query",
            name: "offset",
            schema: { type: "integer", minimum: 0, default: 0 },
            description: "Décalage pour la pagination",
          },
        ],
        responses: {
          200: {
            description: "Une liste de films",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Film" },
                },
                example: [
                  {
                    id: 1,
                    title: "F1",
                    director: "Joseph Kosinski",
                    year: 2025,
                    genre: "Action/Sport",
                  },
                  {
                    id: 2,
                    title: "Inception",
                    director: "Christopher Nolan",
                    year: 2010,
                    genre: "Sci-Fi",
                  },
                ],
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Films"],
        summary: "Créer un film",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Film" },
            },
          },
        },
        responses: {
          201: {
            description: "Film créé",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Film" },
              },
            },
          },
          400: {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          409: { description: "Conflit (doublon)" },
        },
      },
    },
    "/films/{id}": {
      get: {
        tags: ["Films"],
        summary: "Récupérer un film par ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          200: {
            description: "Film trouvé",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Film" },
              },
            },
          },
          404: {
            description: "Film introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Films"],
        summary: "Mettre à jour partiellement un film",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  director: { type: "string" },
                  year: { type: "integer" },
                  genre: { type: "string" },
                },
              },
              example: { year: 2026 },
            },
          },
        },
        responses: {
          200: { description: "Film mis à jour" },
          400: {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          404: { description: "Film introuvable" },
        },
      },
      delete: {
        tags: ["Films"],
        summary: "Supprimer un film",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          204: { description: "Supprimé (pas de contenu)" },
          404: { description: "Film introuvable" },
        },
      },
    },
    "/reviews/:id": {
      delete: {
        tags: ["Reviews"],
        summary: "supprimer un commentaire",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          200: { description: "Commentaire supprimé avec succès" },
          404: { description: "Commentaire introuvable" },
        },
      },
    },
    "/reviews/film/:id/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "Afficher une liste de commentaire par rapport  à un film",
        parameters: [
          {
            in: "path",
            name: "film_id",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", minimum: 1, default: 20 },
            description: "Nombre d’éléments à retourner",
          },
          {
            in: "query",
            name: "offset",
            schema: { type: "integer", minimum: 0, default: 0 },
            description: "Décalage pour la pagination",
          },
        ],
        responses: {
          200: {
            description: "Une liste de commentaires sur un film en particulier",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/commentaire" },
                },
                example: [
                  {
                    id: 1,
                    film_id: 1,
                    author: "John",
                    rating: 4,
                    comment: "this is a comment",
                    created_at: "2025-09-23T11:05:58.712Z",
                  },
                  {
                    id: 2,
                    film_id: 1,
                    author: "Bob",
                    rating: 2,
                    comment: "this film su*k",
                    created_at: "2025-09-21T11:05:58.712Z",
                  },
                ],
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Reviews"],
        summary: "Créer un commentaire",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Review" },
            },
          },
        },
        responses: {
          201: {
            description: "Film créé",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Review" },
              },
            },
          },
          400: {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          409: { description: "Conflit (doublon)" },
        },
      },
    },
  },
};
