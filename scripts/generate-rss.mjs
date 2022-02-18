import { writeFileSync } from "fs";
import RSS from "rss";
import { allPosts } from "contentlayer/generated";

async function generate() {
  const feed = new RSS({
    title: "Patrick Xin",
    site_url: "https://alpesdream.vercel.app",
    feed_url: "https://alpesdream.vercel.app/feed.xml",
  });

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `https://alpesdream.vercel.app/posts/${post.slug}`,
      date: post.publishedAt,
      description: post.description,
    });
  });

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
