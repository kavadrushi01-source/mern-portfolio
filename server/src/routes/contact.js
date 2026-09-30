import { Router } from "express";
import Message from "../models/Message.js";
import { isConnected } from "../db.js";

const router = Router();

const inMemoryMessages = [];

function buildWhatsAppLink(number, text) {
  const digits = String(number).replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

router.post("/", async (req, res) => {
  const body = req.body || {};
  // Only strings are accepted: objects/arrays/numbers would otherwise be stored
  // as garbage or break the text that gets built for WhatsApp.
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const number = typeof body.number === "string" ? body.number.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !number || !message) {
    return res.status(400).json({ success: false, error: "name, number and message are required" });
  }
  if (name.length > 120 || number.length > 40) {
    return res.status(400).json({ success: false, error: "name or number is too long" });
  }
  if (message.length > 2000) {
    return res.status(400).json({ success: false, error: "Message is too long (max 2000 chars)" });
  }

  const n = isConnected();
  let saved = null;

  try {
    if (n) {
      saved = await Message.create({ name, number, message });
    } else {
      saved = { id: inMemoryMessages.length + 1, name, number, message, createdAt: new Date() };
      inMemoryMessages.push(saved);
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: "Could not save message" });
  }

  const whatsappText =
    `New Portfolio Message\n` +
    `----------------------\n` +
    `Name: ${name}\nNumber: ${number}\n\nMessage:\n${message}`;

  res.status(201).json({
    success: true,
    saved,
    whatsapp: buildWhatsAppLink(process.env.WHATSAPP_NUMBER || "919328581846", whatsappText)
  });
});

export default router;