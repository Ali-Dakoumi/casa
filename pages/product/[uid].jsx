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

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const uid = context.params.uid;
  const { data } = await client.query({
    query: POST_BY_UID,
    variables: { uid: uid, lang: "ar-ae" },
  });
  return {
    props: {
      post: data,
    },
    // revalidate: 120,
  };
}
