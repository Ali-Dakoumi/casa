import { POST_BY_UID, ALL_POSTS_UID } from "../../lib/query";
import { useRouter } from "next/router";
import getApolloClient from "../../lib/client";
export default function Product({ post }) {
  const {
    post: {
      image: { url },
      title,
      _meta: { uid },
      slices: [
        {
          variation: {
            items: [{ text }],
          },
        },
      ],
    },
  } = post;
  console.log("🚀 ~ file: [uid].js ~ line 6 ~ Product ~ post", text);

  return (
    <div>
      <article>
        <h2> {title}</h2>
        <section>
          {text.map((par, i) => (
            <p key={i}> {par.text} </p>
          ))}
        </section>
      </article>
    </div>
  );
}

const client = getApolloClient();
export async function getStaticPaths() {
  const posts = await client.query({
    query: ALL_POSTS_UID,
  });
  const { uid } = posts.data.allPosts.edges[0].node._meta;
  const paths = [{ params: { uid: uid, lang: "ar-ae" } }];
  console.log(paths, "pathhhhhhh");

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const uid = context.params.uid;
  console.log("🚀 ~ file: [uid].js ~ line 28 ~ getStaticProps ~ uid", uid);
  const { data } = await client.query({
    query: POST_BY_UID,
    variables: { uid: uid, lang: "ar-ae" },
  });
  console.log("🚀 ~ file: [uid].js ~ line 31 ~ getStaticProps ~ data", data);
  return {
    props: {
      post: data,
    },
    revalidate: 120,
  };
}
