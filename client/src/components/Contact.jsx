import { useState } from "react";
import { sendContact, whatsappLink } from "../api.js";

// "919328581846" -> "+91 93285 81846"
function formatPhone(digits) {
  const mobile = digits.slice(-10);
  const cc = digits.slice(0, Math.max(0, digits.length - 10));
  return `${cc ? `+${cc} ` : ""}${mobile.slice(0, 5)} ${mobile.slice(5)}`.trim();
}

const SOCIALS = [
  {
    key: "github",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.1.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
      </svg>
    )
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M20.5 20h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8.3 19H5v-9h3v9ZM6.5 8.3A1.8 1.8 0 1 1 8.3 6.5a1.8 1.8 0 0 1-1.8 1.8Zm13.5 10.7h-3v-4.4c0-1-.4-1.7-1.3-1.7a1.4 1.4 0 0 0-1.3.9c-.1.2-.1.4-.1.6v4.6h-3V11h3v1.2a3 3 0 0 1 2.7-1.5c2 0 3 1.4 3 5Z" />
      </svg>
    )
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.4 14.2c-.2.6-1.2 1.2-1.7 1.2-.4.1-.9 1-3-1.7-2.5-2-4-4.7-4.2-4.9-.1-.3-1-1.4-1-2.6 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1.2-.1.8-1-.1-1.5-.4-.2-.7.8-2.2-.4-.9-.3-1.1 0-1.7.6-.5-.2 1.4 1.3 0 0 .6.5.8.9 1 1.2.2.3.2.3.1.5-.3-.2-.1-.4-.6-.5Z" />
      </svg>
    )
  }
];

export default function Contact({ portfolio }) {
  const [form, setForm] = useState({ name: "", number: "", message: "" });
  const [status, setStatus] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const whatsapp = portfolio.socials?.whatsapp || "";
  const whatsappDigits = String(whatsapp).replace(/[^0-9]/g, "");
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : "#contact";

  function onSubmit(e) {
    e.preventDefault();
    const clean = {
      name: form.name.trim(),
      number: form.number.trim(),
      message: form.message.trim()
    };
    if (!clean.name || !clean.number || !clean.message) {
      setStatus({ kind: "err", text: "Please add your name, number and a message." });
      return;
    }

    // The visitor's own WhatsApp delivers the message, so the link is built and
    // opened synchronously - inside the click - and never waits on the network:
    // a sleeping backend (or a popup blocker deciding after an await) can no
    // longer swallow the message.
    const link = whatsappLink({ ...clean, to: whatsapp });
    if (!window.open(link, "_blank")) {
      setStatus({
        kind: "err",
        link,
        text: "Your browser blocked the WhatsApp window — open it from this link:"
      });
      return;
    }

    setForm({ name: "", number: "", message: "" });
    setStatus({
      kind: "ok",
      link,
      text: "Message ready in WhatsApp — just press send there to deliver it to me! 🎉"
    });

    // Store a backup copy on the server. Optional by design: if the backend is
    // asleep or absent the message still reached WhatsApp above.
    sendContact(clean).catch((err) => {
      console.warn("[contact] backup save skipped:", err.message);
    });
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Contact</span>
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-sub">Let's build something great together.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>
              Hello 👋, I'm {portfolio.name.split(" ").pop()} — contact me here, always happy
              to chat!
            </h3>
            <p>
              Have a project idea, a job offer or just want to say hi? Send me a message and it
              lands straight on my WhatsApp.
            </p>

            <div className="social-buttons">
              {SOCIALS.map((s) => (
                <a
                  key={s.key}
                  className="social-btn"
                  href={
                    s.key === "github"
                      ? portfolio.socials.github
                      : s.key === "linkedin"
                        ? portfolio.socials.linkedin
                        : whatsappHref
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

{whatsappDigits && (
              <div className="contact-quick">
                <span>📱 {formatPhone(whatsappDigits)}</span>
              </div>
            )}
          </div>

          <form className="contact-form-card" onSubmit={onSubmit}>
            <h3>Send me a message</h3>
            <label>
              Your Name
              <input
                type="text"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={set("name")}
              />
            </label>
            <label>
              Your Number
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={form.number}
                onChange={set("number")}
              />
            </label>
            <label>
              Message
              <textarea
                required
                rows="5"
                maxLength={2000}
                placeholder="Hey! I'd love to talk to you about…"
                value={form.message}
                onChange={set("message")}
              />
            </label>

            <button type="submit" className="btn btn-primary btn-block">
              Send via WhatsApp 💬
            </button>
            {status && (
              <p className={`form-status ${status.kind}`}>
                {status.text}
                {status.link && (
                  <>
                    {" "}
                    <a href={status.link} target="_blank" rel="noreferrer">
                      Open WhatsApp →
                    </a>
                  </>
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}