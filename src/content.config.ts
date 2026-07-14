import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'zod';

const cv = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/cv' }),
  schema: z.object({
    role: z.string(),
    roleEn: z.string(),
    org: z.string(),
    start: z.string(),
    end: z.string().nullable().default(null),
    location: z.string().optional(),
    summary: z.string(),
    summaryEn: z.string(),
    logo: z.string().optional(),
    logoScale: z.number().default(1),
    stack: z.array(z.string()).default([]),
    focus: z.array(z.enum(['leadership', 'tech', 'produkt'])).default([]),
    tier: z.enum(['main', 'earlier']).default('main'),
    order: z.number()
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['de', 'en']),
    tagline: z.string(),
    logo: z.string().optional(),
    url: z.url().optional(),
    role: z.string(),
    timeframe: z.string(),
    status: z.string().optional(),
    stack: z.array(z.string()).default([]),
    partner: z
      .object({
        name: z.string(),
        url: z.url()
      })
      .optional(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    order: z.number()
  })
});

const skills = defineCollection({
  loader: file('./src/content/skills.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    nameEn: z.string().optional(),
    category: z.enum(['leadership', 'ki', 'language', 'framework', 'cloud', 'data', 'practice']),
    tier: z.enum(['core', 'familiar']).default('familiar'),
    order: z.number()
  })
});

const education = defineCollection({
  loader: file('./src/content/education.json'),
  schema: z.object({
    id: z.string(),
    degree: z.string(),
    degreeEn: z.string(),
    institution: z.string(),
    period: z.string(),
    note: z.string().optional(),
    noteEn: z.string().optional(),
    order: z.number()
  })
});

const targets = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/targets' }),
  schema: z.object({
    company: z.string(),
    lang: z.enum(['de', 'en']).default('de'),
    greeting: z.string(),
    intro: z.string(),
    noindex: z.boolean().default(true)
  })
});

export const collections = { cv, projects, skills, education, targets };
