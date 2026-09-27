import { Request, Response } from "express";
import { prisma } from "../prisma";

export class AuthorController {
  async create(req: Request, res: Response) {
    const { name, biography } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    try {
      const author = await prisma.author.create({
        data: { name, biography },
      });
      return res.status(201).json(author);
    } catch (error) {
      return res.status(400).json({ error: "Author already exists or invalid data" });
    }
  }

  async list(req: Request, res: Response) {
    const authors = await prisma.author.findMany({
      include: { books: true },
    });
    return res.json(authors);
  }

  async show(req: Request, res: Response) {
    const id = req.params.id as string;
    const author = await prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.json(author);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const { name, biography } = req.body;

    try {
      const author = await prisma.author.update({
        where: { id },
        data: { name, biography },
      });
      return res.json(author);
    } catch (error) {
      return res.status(404).json({ error: "Author not found" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      await prisma.author.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: "Author not found" });
    }
  }
}