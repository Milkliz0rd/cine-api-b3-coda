import request from "supertest";
import app from "../src/app.js";

describe("Healthcheck", () => {
  it("GET /health -> 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});
