const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crudrestaurante",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { endereco } = req.body;
  const { descritivo } = req.body;
  const { urllogo } = req.body;
  const { nomeresp } = req.body;

  let mysql = "INSERT INTO restaurante ( name, endereco, descritivo, urllogo, nomeresp) VALUES (?, ?, ?, ?, ?)";
  db.query(mysql, [name, endereco, descritivo, urllogo, nomeresp], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { endereco } = req.body;
  const { descritivo } = req.body;
  const { urllogo } = req.body;
  const { nomeresp } = req.body;

  let mysql =
    "SELECT * from restaurante WHERE name = ? AND endereco = ? AND descritivo = ? AND urllogo = ? AND nomeresp = ?";
  db.query(mysql, [name, endereco, descritivo, urllogo, nomeresp], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM restaurante";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { endereco } = req.body;
  const { descritivo } = req.body;
  const { urllogo } = req.body;
  const { nomeresp } = req.body;

  let mysql = "UPDATE restaurante SET name = ?, endereco = ?, descritivo = ? urllogo = ?, nomeresp = ? = WHERE id = ?";
  db.query(mysql, [name, endereco, descritivo,urllogo, nomeresp, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM restaurante WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {''
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
