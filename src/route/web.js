import express from "express";
import HomeController from "../controllers/HomeController";
import CRUDController from "../controllers/CRUDController";
import UserController from "../controllers/UserController"
// Khởi tạo đối tượng router của Express
let router = express.Router();

// Hàm khởi tạo các routes cho ứng dụng web
let initWebRouters = (app) => {

  // Route cho trang chủ, điều hướng tới phương thức getHomepage trong HomeController
  router.get("/", HomeController.getHomepage);

  // Route tĩnh khác với URL '/hoidanit', trả về chuỗi "Hello world with Ga"
  router.get("/hoidanit", (req, res) => {
    return res.send("Hello world with Ga");
  });

  // Các route liên quan tới CRUD (Create, Read, Update, Delete)

  // Route hiển thị trang CRUD (GET), sử dụng phương thức getCRUD trong CRUDController
  router.get("/crud", CRUDController.getCRUD);

  // Route xử lý việc thêm dữ liệu (POST), sử dụng phương thức postCRUD trong CRUDController
  router.post("/post-crud", CRUDController.postCRUD);

  router.get("/get-crud", CRUDController.displayGetCRUD)

  router.get("/edit-crud", CRUDController.getEditCRUD)

  router.post("/put-crud", CRUDController.putCRUD)

  router.get("/delete-crud", CRUDController.deleteCRUD)
 
  router.post("/api/login",UserController.handleLogin)

  router.get("/api/get-all-users",UserController.handleGetAllUser)
  // Sử dụng các route đã định nghĩa phía trên cho ứng dụng với đường dẫn gốc "/"
  return app.use("/", router);
};

// Xuất hàm initWebRouters để có thể sử dụng ở file khác
module.exports = initWebRouters;
