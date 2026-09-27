import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";

const authorRoutes = Router();
const authorController = new AuthorController();

authorRoutes.post("/", authorController.create);
authorRoutes.get("/", authorController.list);
authorRoutes.get("/:id", authorController.show);
authorRoutes.put("/:id", authorController.update);
authorRoutes.delete("/:id", authorController.delete);

export { authorRoutes };