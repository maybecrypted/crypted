import fetch from "node-fetch";

export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: "No username provided" });

  try {
    const r = await fetch(`https://auth.roblox.com/v1/usernames/validate?username=${encodeURIComponent(username)}&birthday=2001-09-11`);
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
