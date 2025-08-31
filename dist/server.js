"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const notes_1 = __importDefault(require("./routes/notes"));
const cors_1 = __importDefault(require("cors"));
const PORT = 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/notes", notes_1.default);
app.get("/", (req, res) => {
    res.send("Hello");
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
