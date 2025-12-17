/**
 * Content Collections Configuration
 * @author andreas@siglochconsulting.de
 *
 * Defines schemas for Markdown content collections (blog posts, etc.)
 */

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Andreas Sigloch'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Publication type and status
    type: z.enum(['blog', 'linkedin', 'conference']).default('blog'),
    // Content category: theory (Fachbeitrag) vs practice (Praxisbeitrag)
    category: z.enum(['theory', 'practice']).optional(),
    linkedinStatus: z.enum(['draft', 'planned', 'published']).optional(),
    linkedinPostDate: z.date().optional(),
    linkedinUrl: z.string().optional(),
    series: z.string().optional(),
    // Suggested hashtags for LinkedIn posting
    hashtags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
