import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import multerConfig from "./config/multer";
import multer from "./config/multer";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.use(authMiddleware);
routes.put("/users", UserController.update);

routes.post("/files", upload.single("file"), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
