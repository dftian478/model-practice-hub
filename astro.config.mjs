// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE ?? 'https://example.com',
	base: process.env.BASE ?? '/',
	integrations: [
		starlight({
			title: {
				'zh-CN': '模型实践中心',
				en: 'Model Practice Hub',
			},
			description: '中立的模型使用最佳实践、FAQ 与排障文档。',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
				en: { label: 'English' },
			},
			customCss: ['./src/styles/site.css'],
			sidebar: [
				{
					label: '开始',
					translations: { en: 'Start Here' },
					items: [
						{ label: '概览', slug: 'overview', translations: { en: 'Overview' } },
						{ label: '发布规范', slug: 'editorial-policy', translations: { en: 'Editorial Policy' } },
					],
				},
				{
					label: '最佳实践',
					translations: { en: 'Best Practices' },
					items: [{ autogenerate: { directory: 'best-practices' } }],
				},
				{
					label: 'OpenAI',
					items: [
						{ label: '概览', slug: 'openai', translations: { en: 'Overview' } },
						{ label: '快速开始', slug: 'openai/quickstart', translations: { en: 'Quickstart' } },
						{ label: '配置', slug: 'openai/configuration', translations: { en: 'Configuration' } },
						{ label: 'curl 示例', slug: 'openai/curl-examples', translations: { en: 'Curl Examples' } },
						{ label: '最佳实践', slug: 'openai/best-practices', translations: { en: 'Best Practices' } },
						{ label: '常见问题', slug: 'openai/faq', translations: { en: 'FAQ' } },
						{ label: '排障', slug: 'openai/troubleshooting', translations: { en: 'Troubleshooting' } },
						{
							label: '模型',
							translations: { en: 'Models' },
							items: [{ autogenerate: { directory: 'openai/models' } }],
						},
						{
							label: 'GPT 推理',
							translations: { en: 'GPT Reasoning' },
							items: [{ autogenerate: { directory: 'openai/reasoning' } }],
						},
					],
				},
				{
					label: '常见问题',
					translations: { en: 'FAQ' },
					items: [{ autogenerate: { directory: 'faq' } }],
				},
				{
					label: '排障',
					translations: { en: 'Troubleshooting' },
					items: [{ autogenerate: { directory: 'troubleshooting' } }],
				},
				{
					label: '参考',
					translations: { en: 'Reference' },
					items: [{ label: '术语表', slug: 'glossary', translations: { en: 'Glossary' } }],
				},
			],
		}),
	],
});
