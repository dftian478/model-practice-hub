// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE ?? 'https://example.com',
	base: process.env.BASE ?? '/',
	integrations: [
		starlight({
			title: 'Model Practice Hub',
			description: 'Neutral best-practice notes, FAQs, and troubleshooting guides for applied AI model usage.',
			customCss: ['./src/styles/site.css'],
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'Overview', slug: 'overview' },
						{ label: 'Editorial Policy', slug: 'editorial-policy' },
					],
				},
				{
					label: 'Best Practices',
					items: [{ autogenerate: { directory: 'best-practices' } }],
				},
				{
					label: 'FAQ',
					items: [{ autogenerate: { directory: 'faq' } }],
				},
				{
					label: 'Troubleshooting',
					items: [{ autogenerate: { directory: 'troubleshooting' } }],
				},
				{
					label: 'Reference',
					items: [{ label: 'Glossary', slug: 'glossary' }],
				},
			],
		}),
	],
});
