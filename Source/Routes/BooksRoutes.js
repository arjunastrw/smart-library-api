import express from "express";
import {
  getAllBooks,
  getBooksByCode,
  createBooks,
  updateStockBooks,
  deleteBooks,
} from "../Controllers/BooksControllers.js";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     description: Mendapatkan semua data buku
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/api/books", getAllBooks);

/**
 * @swagger
 * /api/book/{code}:
 *   get:
 *     description: Mendapatkan data buku berdasarkan kode
 *     parameters:
 *       - name: code
 *         in: path
 *         description: Kode buku
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/api/book/:code", getBooksByCode);

/**
 * @swagger
 * /api/book:
 *  post:
 *    description: Membuat data buku baru
 *    tags:
 *      - Books
 *    responses:
 *      '201':
 *        description: Data Buku berhasil dibuat
 */
router.post("/api/book", createBooks);

/**
 * @swagger
 * /api/book/{code}:
 *  update:
 *    description: Mengupdate data buku
 *    parameters:
 *      - name: code
 *        in: path
 *        description: Kode buku
 *        required: true
 *        schema:
 *          type: string
 *    tags:
 *      - Books
 *    responses:
 *      '200':
 *        description: Data buku berhasil diupdate
 */
router.put("/api/book/:code", updateStockBooks);

/**
 * @swagger
 * /api/book/{code}:
 *  delete:
 *    description: Menghapus data buku
 *    parameters:
 *      - name: code
 *        in: path
 *        description: Kode buku
 *        required: true
 *        schema:
 *          type: string
 *    tags:
 *      - Books
 *    responses:
 *      '200':
 *        description: Data buku berhasil dihapus
 */
router.delete("/api/book/:code", deleteBooks);

export default router;
