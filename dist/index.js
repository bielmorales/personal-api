"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const prompt_1 = require("./prompt");
require("dotenv").config();
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const openai = new openai_1.default({
    apiKey: process.env["OPENAI_API_KEY"],
});
app.use(cors());
app.use(express_1.default.json());
app.post("/get-answer", async (req, res) => {
    const question = req.body.question;
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: (0, prompt_1.questionToPrompt)(question) }],
        model: "gpt-3.5-turbo",
    });
    const answer = chatCompletion.choices[0].message.content;
    res.send({ answer });
});
app.get("/", (req, res) => {
    res.send("Welcome to Gabriel Morales API");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
