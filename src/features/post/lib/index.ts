import { allPosts } from "contentlayer/generated";

export const getPost = (slug: string) =>
  allPosts.find((post) => post.slug === slug);

export const getSortedPostsByDate = () =>
  allPosts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );

export const getAllPosts = () => allPosts;

export const getAllPostsPaths = () =>
  allPosts.map((p) => ({ params: { slug: p.slug } }));

export const getAdjacentPosts = (slug: string) => {
  const postIndex = allPosts.findIndex((post) => post?.slug === slug);
  return {
    previous:
      postIndex <= 0
        ? null
        : {
            slug: allPosts[postIndex - 1]!.slug,
            title: allPosts[postIndex - 1]!.title,
          },
    next:
      postIndex >= allPosts.length - 1
        ? null
        : {
            slug: allPosts[postIndex + 1]!.slug,
            title: allPosts[postIndex + 1]!.title,
          },
  };
};

export const getMostRecentPost = () =>
  allPosts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  )[0];

export { allPosts };
