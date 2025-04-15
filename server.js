const express = require("express");
const mustacheExpress = require("mustache-express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 8080;

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const pagesData = {
  home: {
    title: "Home form",
    content: "Welcome to home page!",
  },
  second: {
    title: "Congratulation",
    content: "This page have a congratulation.",
  },
  third: { title: "Information", content: "This page have information." },
  fourth: {
    title: "Information2",
    content: "This page also have information.",
  },
  form: { title: "Form", content: "Fill in the form." },
};

// Загрузка пользователей
const usersFile = "./users.json";
let users = [];

if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, "utf-8")).users;
} else {
  console.error("Ошибка: файл users.json не найден!");
}

app.get("/", (req, res) => {
  res.render("home", pagesData.home);
});

app.get("/second", (req, res) => {
  res.render("second", pagesData.second);
});

app.get("/third", (req, res) => {
  res.render("third", pagesData.third);
});

app.get("/fourth", (req, res) => {
  res.render("fourth", pagesData.fourth);
});

app.get("/form", (req, res) => {
  res.render("form", pagesData.form);
});

app.post("/submit-form", (req, res) => {
  const formData = req.body;
  res.render("form-result", {
    title: "Result",
    fields: Object.entries(formData).map(([key, value]) => ({ key, value })),
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
