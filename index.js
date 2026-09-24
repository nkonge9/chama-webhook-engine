import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "chama_bot_verify_token_2026";

// Meta Handshake Verification (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Meta Webhook Verified Successfully!");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Incoming Events from WhatsApp (POST)
app.post("/webhook", (req, res) => {
  res.status(200).send("EVENT_RECEIVED");
  console.log("Incoming Webhook Event:", JSON.stringify(req.body, null, 2));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
