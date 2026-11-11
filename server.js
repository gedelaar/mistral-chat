import "dotenv/config";
import express from "express";
import { Mistral } from "@mistralai/mistralai";

const app = express();
const port = process.env.PORT || 3000;

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body ?? {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Een niet-lege 'message' is vereist." });
  }

  if (!process.env.MISTRAL_API_KEY) {
    return res.status(500).json({ error: "MISTRAL_API_KEY is niet geconfigureerd op de server." });
  }

  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        ...history
          .filter((m) => m && typeof m.role === "string" && typeof m.content === "string")
          .map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
    });

    const reply = chatResponse.choices?.[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error("Mistral API fout:", err?.message);
    res.status(502).json({ error: "Aanroep naar de Mistral API mislukt." });
  }
});

app.listen(port, () => {
  console.log(`Mistral chat app draait op http://localhost:${port}`);
});
