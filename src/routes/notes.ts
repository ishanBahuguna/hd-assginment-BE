import { Router } from "express";
import { create, getNotes, remove } from "../controllers/note";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create" ,  AuthMiddleware , create);

router.get("/getNotes", AuthMiddleware , getNotes)

router.delete("/remove/:id" , remove);

export default router;