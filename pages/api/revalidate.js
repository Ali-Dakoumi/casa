export default async function handler(req, res) {
  // const { data, setData } = useContext(DataContext);
  // if (req.query.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
  //   return res.status(404).json({ message: "Invalid token" });
  // }

  try {
    // await res.revalidate(req.query.path);
    return res.json({
      revalidated: true,
    });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
