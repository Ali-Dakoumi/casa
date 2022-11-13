import getApolloClient from "../../lib/client";
import { ALL_POSTS } from "../../lib/query";

export default async function handler(req, res) {
  // const { data, setData } = useContext(DataContext);
  // if (req.query.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
  //   return res.status(404).json({ message: "Invalid token" });
  // }

  try {
    // await res.revalidate(req.query.path);
    const client = getApolloClient();
    const { data } = await client.query({
      query: ALL_POSTS,
    });
    return res.json({
      revalidated: true,
      data: JSON.stringify(data),
    });
  } catch (err) {
    return res.status(500).send("Error revalidating !!! ");
  }
}
