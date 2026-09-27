import { Request, Response } from "express";
import { prisma } from "../prisma";

export class BookController {
  async create(req: Request, res: Response) {
    const { title, release_year, author_id } = req.body;

    if (!title || !release_year || !author_id) {
      return res.status(400).json({ error: "Title, release_year, and author_id are required" });
    }

    try {
      const book = await prisma.book.create({
        data: { title, release_year: Number(release_year), author_id },
      });
      return res.status(201).json(book);
    } catch (error) {
      return res.status(400).json({ error: "Invalid author_id or book data" });
    }
  }

  async list(req: Request, res: Response) {
    const books = await prisma.book.findMany({
      include: { author: true },
    });
    return res.json(books);
  }

  async show(req: Request, res: Response) {
    const id = String(req.params.id);
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.json(book);
  }

  async update(req: Request, res: Response) {
    const id = String(req.params.id);
    const { title, release_year, author_id } = req.body;

    try {
      const book = await prisma.book.update({
        where: { id },
        data: {
          title,
          release_year: release_year ? Number(release_year) : undefined,
          author_id,
        },
      });
      return res.json(book);
    } catch (error) {
      return res.status(404).json({ error: "Book not found" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = String(req.params.id);

    try {
      await prisma.book.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: "Book not found" });
    }
  }
}
// Atualizar Livro (PUT /books/:id)
export async function updateBook(req: Request, res: Response) {
  const { id } = req.params;
  const { title, release_year } = req.body;

  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: { title, release_year },
    });

    return res.json(updatedBook);
  } catch (error) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
}

// Eliminar Livro (DELETE /books/:id)
export async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: 'Livro não encontrado' });
  }
}