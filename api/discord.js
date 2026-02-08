export default async function handler(req, res) {
  const code = req.query.code

  if (!code) {
    res.status(400).json({ error: "No code" })
    return
  }

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: "https://crypted-nu.vercel.app/dashboard",
      scope: "identify"
    })
  })

  const tokenData = await tokenRes.json()

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  })

  const user = await userRes.json()

  res.status(200).json(user)
}
