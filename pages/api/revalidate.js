export default async function handler(req, res) {
  if (req.body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return res.status(401).json({
      message: "Invalid token",
      token: req.query.secret,
      processVar: process.env.PRISMIC_WEBHOOK_SECRET,
    });
  }

  try {
    await res.revalidate(req.query.path);
    return res.json({
      revalidated: true,
    });
  } catch (err) {
    return res.status(500).send("Error revalidating !!!");
  }
}
