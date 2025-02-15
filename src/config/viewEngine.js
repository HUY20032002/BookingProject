//
// var global
// let trong function
import express from "express";
let configViewEngine = (app) => {
  // arrow function
  // Ảnh chỉ lấy trên public
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  //   code clients in views
  app.set("views", "./src/views");
};
module.exports = configViewEngine;
