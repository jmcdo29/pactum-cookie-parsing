const express = require("express");
const { spec, request } = require("pactum");

const app = express();

app.get("/one-cookie", (req, res) => {
  res.setHeader("Set-Cookie", "one=1").sendStatus(200);
});

app.get("/two-cookies", (req, res) => {
  res.setHeader("Set-Cookie", ["one=1", "two=2"]).sendStatus(200);
});

app.get("/two-cookies-one-string", (req, res) => {
  res.setHeader("Set-Cookie", "one=1; two=2;").sendStatus(200);
});

app.listen(3000, async () => {
  request.setBaseUrl("http://localhost:3000");
  await spec()
    .get("/one-cookie")
    .expectStatus(200)
    .expectCookies("one", "1")
    .toss();
  await spec()
    .get("/two-cookies-one-string")
    .expectStatus(200)
    .expectCookiesLike("one", "1")
    .expectCookiesLike("two", "2")
    .toss();
  await spec()
    .get("/two-cookies")
    .expectStatus(200)
    .expectCookiesLike("one", "1")
    .expectCookiesLike("two", "2")
    .toss();
});
