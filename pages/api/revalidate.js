import { useContext } from "react";
import { DataContext } from "../../lib/context";

export default async function handler(req, res) {
  // const { data, setData } = useContext(DataContext);
  if (req.query.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(req.query.path);
    return res.json({
      revalidated: true,
      data,
    });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
