// pages/api/sniper.js
export default async function handler(req, res) {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "No username provided" });
  }

  try {
    const r = await fetch(
      `https://auth.roblox.com/v1/usernames/validate?username=${encodeURIComponent(username)}&birthday=2001-09-11`
    );

    if (!r.ok) throw new Error("Roblox API error");

    const data = await r.json();

    // data.code: 0 = valid, 1 = taken, 2 = censored
    return res.status(200).json({ code: data.code });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to check username" });
  }
}
