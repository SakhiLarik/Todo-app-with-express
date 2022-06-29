const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
var global_error = "";
const routes = function (app) {
  const jsonParser = bodyParser.json();
  const urlEncodedBoodyPaser = bodyParser.urlencoded({ extended: false });
  app.use("/public", express.static(path.join(__dirname, "../public")));

  app.use(jsonParser);
  app.use(urlEncodedBoodyPaser);

  app.get("/", (req, res) => {
    res.send("<h1>Welcome to Express JS </h1>");
  });
  app.get("/todos", (req, res) => {
    fs.readFile(
      path.join(__dirname, "../views/todo", "todos.json"),
      "utf-8",
      (err, data) => {
        if (err) throw err;
        res.send(data);
      }
    );
  });

  app.delete("/delete/todo/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    fs.readFile(
      path.join(__dirname, "../views/todo", "todos.json"),
      "utf-8",
      (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        var find = data.find((entry) => {
          return entry.id === id;
        });
        data.splice(data.indexOf(find), 1);
        fs.writeFile(
          path.join(__dirname, "../views/todo", "todos.json"),
          JSON.stringify(data),
          "utf-8",
          (err, data) => {
            if (err) throw err;
            res.send(data);
          }
        );
      }
    );
    res.redirect("/todo");
  });

  app.get("/todo", (req, res) => {
    fs.readFile(
      path.join(__dirname, "..", "/views", "/todo/index.html"),
      "utf-8",
      (err, data) => {
        if (err) throw err;
        res.send(data);
      }
    );
  });
  // app.get("/todos",(req,res)=>{
  //     fs.readFile(path.join(__dirname,"..","/views","/todo/todos.json"),"utf-8",(err,data)=>{
  //         if (err) throw err;
  //         const jsonData = JSON.parse(data);
  //         res.json(jsonData.map(data => {return data.id }));
  //     });
  // });

  app.post("/addToDo", urlEncodedBoodyPaser, (req, res) => {
    let description = req.body.description;
    fs.readFile(
      path.join(__dirname, "../views/todo", "todos.json"),
      "utf-8",
      (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        let maxID = Math.max(
          ...data.map((get) => {
            return get.id;
          })
        );
        let newToDo = {
          id: maxID + 1,
          description: description,
        };
        data.push(newToDo);
        fs.writeFile(
          path.join(__dirname, "../views/todo", "todos.json"),
          JSON.stringify(data),
          "utf-8",
          (err, data) => {
            if (err) throw err;
            fs.readFile(
              path.join(__dirname, "..", "/views", "/todo/index.html"),
              "utf-8",
              (err, data) => {
                if (err) throw err;
                res.send(data);
              }
            );
          }
        );
      }
    );
    res.redirect("/todo");
  });

  app.use((req, res) => {
    res.send("<h1 class='invalid-page'>4o4 </h1>");
  });
};

module.exports = {
  routes,
  global_error,
};
