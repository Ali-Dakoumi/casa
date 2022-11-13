import { gql } from "urql";

export const ALL_POSTS = gql`
  query ExampleRepeatableQuery {
    allPosts {
      edges {
        node {
          _meta {
            uid
          }
          title
          image
          slices {
            ... on PostSlicesContent {
              variation {
                ... on PostSlicesContentDefault {
                  items {
                    text
                    image
                  }
                }
                ... on PostSlicesContentNoimage {
                  items {
                    text
                  }
                }
              }
            }
          }
          author {
            ... on Author {
              name
            }
          }
        }
      }
    }
  }
`;

export const POST_BY_UID = gql`
  query ExampleQueryByUID($uid: String!, $lang: String!) {
    post(uid: $uid, lang: $lang) {
      title
      image
      _meta {
        uid
      }
      author {
        ... on Author {
          name
        }
      }
      slices {
        ... on PostSlicesContent {
          variation {
            ... on PostSlicesContentDefault {
              items {
                text
                image
              }
            }
            ... on PostSlicesContentNoimage {
              items {
                text
              }
            }
          }
        }
      }
    }
  }
`;

export const ALL_POSTS_UID = gql`
  query allPostsUid {
    allPosts {
      edges {
        node {
          _meta {
            uid
          }
        }
      }
    }
  }
`;
