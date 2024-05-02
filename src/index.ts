import express from "express";
import OpenAI from "openai";
import { questionToPrompt } from "./prompt";
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

app.use(cors());
app.use(express.json());

app.post("/get-answer", async (req, res) => {
  const question = req.body.question;
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: questionToPrompt(question) }],
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
