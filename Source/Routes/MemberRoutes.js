import express from "express";
import {
  getAllMember,
  getMemberByCode,
  createMember,
  deleteMember,
} from "../Controllers/MemberControllers.js";

const router = express.Router();

/**
 * @swagger
 * /api/members:
 *   get:
 *     description: Mendapatkan semua anggota
 *     tags:
 *       - Members
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/api/members", getAllMember);

/**
 * @swagger
 * /api/member/{code}:
 *   get:
 *     description: Mendapatkan anggota berdasarkan kode
 *     parameters:
 *       - name: code
 *         in: path
 *         description: Kode anggota
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - Members
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/api/member/:code", getMemberByCode);

/**
 * @swagger
 * /api/member:
 *  post:
 *    description: Membuat anggota baru
 *    tags:
 *      - Members
 *    responses:
 *      '201':
 *        description: Anggota berhasil dibuat
 */
router.post("/api/member", createMember);

/**
 * @swagger
 * /api/member/{code}:
 *  delete:
 *    description: Menghapus anggota berdasarkan kode
 *    parameters:
 *      - name: code
 *        in: path
 *        description: Kode anggota
 *        required: true
 *        schema:
 *          type: string
 *    tags:
 *      - Members
 *    responses:
 *      '200':
 *        description: Anggota berhasil dihapus
 */
router.delete("/api/member/:code", deleteMember);

export default router;
