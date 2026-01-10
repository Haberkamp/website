import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

const bookmarks = defineCollection({
  loader: file("src/content/bookmarks/bookmarks.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, bookmarks };

