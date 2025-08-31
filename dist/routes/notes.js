"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_1 = require("../controllers/note");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/create", authMiddleware_1.default, note_1.create);
router.get("/getNotes", authMiddleware_1.default, note_1.getNotes);
router.delete("/remove/:id", note_1.remove);
exports.default = router;
