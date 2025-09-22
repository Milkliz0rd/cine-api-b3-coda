import request from "supertest";
import app from "../src/app.js";

describe("Films", () => {
  it("GET /films -> array (may be empty)", async () => {
    const res = await request(app).get("/films");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
