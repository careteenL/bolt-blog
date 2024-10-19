import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.string(),
		updatedDate: z.date().optional(),
		author: z.string().default('匿名'),
		image: z.string().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = {
	'blog': blogCollection,
};