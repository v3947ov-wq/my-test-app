// Vercel serverless function: sends form leads to Telegram.
// Set TG_TOKEN and TG_CHAT_ID in Vercel > Settings > Environment Variables.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, business, link, contact, calc } = req.body || {};
  if (!name || !business || !link || !contact) return res.status(400).end();
  const text = `Новая заявка turbo studio\nИмя: ${name}\nБизнес: ${business}\nСсылка: ${link}\nКонтакт: ${contact}\nКалькулятор: ${calc || "-"}`;
  const r = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text }),
  });
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
