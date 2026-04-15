export default async function handler(req, res) {
  // 1. Set CORS headers to allow all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (Pre-flight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Credits and Meta Information
  const credits = {
    Dev: "Rana Faisal Ali",
    Brand: "FTGM",
    Visit: "https://ftgmtools.pages.dev",
    Contact: "923104882921 For more"
  };

  const targetUrl = "https://unavatar.io/whatsapp/923104882921";

  try {
    // If you want to return the Image URL + Credits as JSON:
    if (req.query.json === 'true') {
      return res.status(200).json({
        ...credits,
        avatar_url: targetUrl
      });
    }

    // Default behavior: Redirect to the image with credits in headers
    res.setHeader('X-Developer', credits.Dev);
    res.setHeader('X-Brand', credits.Brand);
    res.redirect(302, targetUrl);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", ...credits });
  }
}
