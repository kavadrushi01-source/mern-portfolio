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
  const { name, number, message } = req.body || {};

  if (!name || !number || !message) {
    return res.status(400).json({ success: false, error: "name, number and message are required" });
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