import request from "supertest";
import app from "../src/app.js";
import { resetDb, seedFilms, closeDb } from "./testUtils.js";

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await closeDb();
});

describe("GET /films", () => {
  it("retourne [] quand la base est vide", async () => {
    const res = await request(app).get("/films");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]); // ou toHaveLength(0)
  });

  it("retourne la liste des films existants", async () => {
    await seedFilms([
      { title: "Alien", director: "Ridley Scott", year: 1979, genre: "SF" },
      { title: "Heat", director: "Michael Mann", year: 1995, genre: "Crime" },
    ]);

    const res = await request(app).get("/films");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);

    // Vérifie la structure
    const one = res.body[0];
    expect(one).toHaveProperty("id");
    expect(one).toHaveProperty("title");
    expect(one).toHaveProperty("director");
    expect(one).toHaveProperty("year");
    expect(one).toHaveProperty("genre");
  });
});

describe("POST /films", () => {
  it("crée un film valide et renvoie 200 + { message, film }", async () => {
    const payload = {
      title: "Blade Runner",
      director: "Ridley Scott",
      year: 1982,
      genre: "SF",
    };

    const res = await request(app).post("/films").send(payload);

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.body).toHaveProperty("message", "Film créé avec succès !");
    expect(res.body).toHaveProperty("film");

    expect(res.body.film).toMatchObject({
      title: "Blade Runner",
      director: "Ridley Scott",
      year: 1982,
      genre: "SF",
    });
    expect(typeof res.body.film.id).toBe("number");
  });

  it("refuse un payload sans title (400)", async () => {
    const res = await request(app)
      .post("/films")
      .send({ director: "X", year: 2000, genre: "Y" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
