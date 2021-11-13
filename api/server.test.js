const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe("[POST] /api/auth/register", () => {
  test("responds with status 201 and newly created user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "rose", password: "1234" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      username: "rose",
      password: res.body.password,
    });
  });

  test("responds with status 400 and error if username or password is missing", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "" });
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "username and password required",
    });
  });
});

describe("[POST] /api/auth/login", () => {
  test("responds with status 401 and error if user does not exist in the database", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "xxxxxx", password: "xxxxx" });
    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({
      message: "invalid credentials",
    });
  });

  test("responds with status 400 and error if username or password is missing", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "" });
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "username and password required",
    });
  });
});
