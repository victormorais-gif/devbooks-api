import { Router } from "express";
import { BookController } from "../controllers/BookController";

const bookRoutes = Router();
const bookController = new BookController();

bookRoutes.post("/", bookController.create);
bookRoutes.get("/", bookController.list);
bookRoutes.get("/:id", bookController.show);
bookRoutes.put("/:id", bookController.update);
bookRoutes.delete("/:id", bookController.delete);

export { bookRoutes };
// Importe as funções updateBook e deleteBook do BookController
import { createBook, listBooks, updateBook, deleteBook } from '../controllers/BookController';

// Adicione as rotas de PUT e DELETE
bookRoutes.put('/books/:id', updateBook);
bookRoutes.delete('/books/:id', deleteBook);