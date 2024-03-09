import express from "express";
import {
  getAllLoan,
  getLoanByID,
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

router.post("/api/loan", createLoan);
router.put("/api/loan/:id", updateReturnDateAndPenaltyStatus);
export default router;
