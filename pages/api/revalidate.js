export default async function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_REVALIDATE_TOKEN) {
    return res
      .status(401)
      .json({
        message: "Invalid token",
        token: req.query.secret,
        processVar: process.env.NEXT_REVALIDATE_TOKEN,
      });
  }

  try {
    await res.revalidate(req.query.path);
    return res.json({
      revalidated: true,
    });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
