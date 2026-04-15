export default async function handler(req, res) {
  // 1. CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Get number from Query Params (e.g., /api?num=92310...)
  const { num } = req.query;

  const credits = {
    Dev: "Rana Faisal Ali",
    Brand: "FTGM",
    Visit: "https://ftgmtools.pages.dev",
    Contact: "923104882921 For more"
  };

  if (!num) {
    return res.status(400).json({ 
      error: "Please provide a number. Example: ?num=923104882921",
      ...credits 
    });
  }

  const targetUrl = `https://unavatar.io/whatsapp/${num}`;

  try {
    // Agar JSON chahiye (?json=true)
    if (req.query.json === 'true') {
      return res.status(200).json({
        phone_number: num,
        avatar_url: targetUrl,
        ...credits
      });
    }

    // Direct Image Redirect
    res.setHeader('X-Developer', credits.Dev);
    res.redirect(302, targetUrl);

  } catch (error) {
    res.status(500).json({ error: "Server Error", ...credits });
  }
}
