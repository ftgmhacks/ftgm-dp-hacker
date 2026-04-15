export default async function handler(req, res) {
  const allowedDomain = "ftgm-dp-hacker.vercel.app";
  
  // Request kahan se aa rahi hai (Origin or Referer)
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";

  // Domain Lock Logic
  const isAllowed = origin.includes(allowedDomain) || referer.includes(allowedDomain);

  // Agar domain match nahi karti toh "Chutiya" message show karo
  if (!isAllowed) {
    return res.status(403).json({
      status: "Blocked",
      message: "We Detect That You Are a Chutiya Copy Paster! So This Api is Not Working For You Baby",
      credits: {
        Dev: "Rana Faisal Ali",
        Brand: "FTGM"
      }
    });
  }

  // --- Agar domain sahi hai toh baaki code chale ga ---

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', `https://${allowedDomain}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { num } = req.query;
  const credits = {
    Dev: "Rana Faisal Ali",
    Brand: "FTGM",
    Visit: "https://ftgmtools.pages.dev",
    Contact: "923104882921 For more"
  };

  if (!num) {
    return res.status(400).json({ 
      error: "Number Missing! Example: ?num=923104882921",
      ...credits 
    });
  }

  const targetUrl = `https://unavatar.io/whatsapp/${num}`;

  try {
    if (req.query.json === 'true') {
      return res.status(200).json({
        phone_number: num,
        avatar_url: targetUrl,
        ...credits
      });
    }

    res.redirect(302, targetUrl);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
  }
