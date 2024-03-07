import express from "express";
import {
  getAllMember,
  getMemberByCode,
  createMember,
  deleteMember,
} from "../Controllers/MemberControllers.js";

const router = express.Router();

router.get("/member", getAllMember);
router.get("/member/:code", getMemberByCode);
router.post("/member", createMember);
router.delete("/member/:code", deleteMember);

export default router;
