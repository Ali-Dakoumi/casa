import { prismic, prismicClient, repositoryName } from "../prismicio";
import styles from "../styles/Home.module.css";
import { ALL_POSTS } from "../lib/query";
import Link from "next/link";
import getApolloClient from "../lib/client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { DataContext } from "../lib/context";
export default function Home({ posts }) {
  const { data, setData } = useContext(DataContext);
  // console.log(setData({ user: "ali" }));
  useEffect(() => {
    setData("hello");
    console.log(data);
  }, []);

  posts.map((post) => console.log(post));
  return (
    <div className={styles.container}>
      {posts.map((post) => {
        const {
          node: {
            image: { url },
            title,
            _meta: { uid },
            slices: [
              {
                variation: {
                  items: [
                    {
                      text: [{ text }],
                    },
                  ],
                },
              },
            ],
          },
        } = post;
        return (
          <article key={uid}>
            <Link href={`/product/${uid}`}>{title}</Link>
            <Image
              src={url}
              width={200}
              height={200}
              alt="Picture of the author"
            />
          </article>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(props) {
  const client = getApolloClient();
  const { data } = await client.query({
    query: ALL_POSTS,
  });
  console.log(data);
  return {
    props: {
      posts: data.allPosts.edges,
    },
  };
}
