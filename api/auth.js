// api/auth.js
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // 1. Exchange the code for an Access Token
  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: '1469524111796736072',
      client_secret: 'NHUUkkcUmD8Ga20PBN1kJKjqsp5bi07j', // Get this from Discord Dev Portal
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://crypted-nu.vercel.app/dashboard', 
    }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const tokens = await tokenResponse.json();

  if (tokens.error) {
    return res.status(400).json(tokens);
  }

  // 2. Use the Access Token to get User Profile
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  const userData = await userResponse.json();

  // 3. Send the user data back to your HTML
  res.status(200).json(userData);
}
