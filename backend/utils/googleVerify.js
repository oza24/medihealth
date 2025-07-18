const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // ✅ Use environment variable

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // ✅ secure
  });
  const payload = ticket.getPayload(); // contains name, email, picture, etc.
  return payload;
}

module.exports = verify;
