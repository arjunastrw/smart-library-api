import express from "express";
import {
  getAllLoan,
  getLoanByID,
  countBooksBorrowedByMember,
  createLoan,
  updateReturnDateAndPenaltyStatus,
} from "../Controllers/LoanControllers.js";

const router = express.Router();

/**
 * @swagger
 * /api/loans:
 *   get:
 *     description: Mendapatkan semua data pinjaman buku
 *     tags:
 *       - Loans
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/api/loans", getAllLoan);

/**
 * @swagger
 * /api/loan/{id}:
 *   get:
 *     description: Mendapatkan data pinjaman buku berdasarkan ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID pinjaman buku
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Loans
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/api/loan/:id", getLoanByID);

/**
 * @swagger
 * /api/:code/count:
 *   get:
 *     description: Mendapatkan data jumlah buku yang di pinjam anggota
 *     parameters:
 *       - name: code
 *         in: path
 *         description: Code anggota
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Loans
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/api/:code/count/", countBooksBorrowedByMember);

/**
 * @swagger
 * /api/loan:
 *  post:
 *    description: Membuat data pinjaman buku baru
 *    tags:
 *      - Loans
 *    responses:
 *      '201':
 *        description: Data pinjaman buku berhasil dibuat
 */
router.post("/api/loan", createLoan);

/**
 * @swagger
 * /api/loan/{id}:
 *  put:
 *    description: Mengupdate data pinjaman buku
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID pinjaman buku
 *        required: true
 *        schema:
 *          type: string
 *    tags:
 *      - Loans
 *    responses:
 *      '200':
 *        description: Data pinjaman buku berhasil diupdate
 */
router.put("/api/loan/:id", updateReturnDateAndPenaltyStatus);
export default router;
