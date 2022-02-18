import { Feed } from "feed";
import fs from "fs";
import type { Post } from "contentlayer/generated";

export const generateRSSFeed = (posts: Post[]) => {
  const baseUrl = "https://alpesdream.vercel.app";
  const author = {
    name: "Patrick Xin",
    email: "alpesdream@gmail.com",
    link: "https://twitter.com/ashleemboyer",
  };

  const feed = new Feed({
    title: "Blog posts by Patrick Xin",
    description:
      "Articles, thoughts about Web Development from a frontend developer.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
    copyright: "All rights reserved 2022, Patrick Xin",
  });

  posts.forEach((post) => {
    const { description, title, slug, publishedAt } = post;
    const url = `${baseUrl}/${slug}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      author: [author],
      date: new Date(publishedAt),
    });
  });

  fs.writeFileSync("public/rss.xml", feed.rss2());
};
