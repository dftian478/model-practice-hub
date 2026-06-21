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
					label: 'OpenAI',
					items: [
						{ label: 'Overview', slug: 'openai' },
						{ label: 'Quickstart', slug: 'openai/quickstart' },
						{ label: 'Configuration', slug: 'openai/configuration' },
						{ label: 'Curl Examples', slug: 'openai/curl-examples' },
						{ label: 'Best Practices', slug: 'openai/best-practices' },
						{ label: 'FAQ', slug: 'openai/faq' },
						{ label: 'Troubleshooting', slug: 'openai/troubleshooting' },
						{
							label: 'Models',
							items: [{ autogenerate: { directory: 'openai/models' } }],
						},
						{
							label: 'GPT Reasoning',
							items: [{ autogenerate: { directory: 'openai/reasoning' } }],
						},
					],
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
