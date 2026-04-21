import { defineConfig } from 'vitepress'

const enSidebar = {
  '/en/': [
    {
      text: 'Lectures',
      items: [
        { text: 'Welcome', link: '/en/' },
        { text: '01 · Why Traditional SDLC Breaks', link: '/en/lectures/lecture-01-why-traditional-sdlc-breaks/' },
        { text: '02 · The Agentic Loop', link: '/en/lectures/lecture-02-the-agentic-loop/' },
        { text: '03 · Context Engineering', link: '/en/lectures/lecture-03-context-engineering/' },
        { text: '04 · Harness Design', link: '/en/lectures/lecture-04-harness-design/' },
        { text: '05 · Multi-Agent Patterns', link: '/en/lectures/lecture-05-multi-agent-patterns/' },
        { text: '06 · Testing Agentic Pipelines', link: '/en/lectures/lecture-06-testing-agentic-pipelines/' },
        { text: '07 · Observability', link: '/en/lectures/lecture-07-observability/' },
        { text: '08 · Human-in-the-Loop Governance', link: '/en/lectures/lecture-08-human-in-the-loop/' },
        { text: '09 · Bibliography', link: '/en/lectures/lecture-09-bibliography/' },
      ],
    },
    {
      text: 'Projects',
      items: [
        { text: 'Overview', link: '/en/projects/' },
        { text: 'Project 01 · Vibe Coding vs Harness Engineering', link: '/en/projects/project-01-baseline-vs-agentic/' },
        { text: 'Project 02 · Minimal Harness', link: '/en/projects/project-02-minimal-harness/' },
        { text: 'Project 03 · Multi-Agent Pipeline', link: '/en/projects/project-03-multi-agent-pipeline/' },
      ],
    },
    {
      text: 'Resources',
      items: [
        { text: 'Library', link: '/en/resources/' },
        { text: 'Templates', link: '/en/resources/templates/' },
        { text: 'Guides', link: '/en/resources/guides/' },
        { text: 'Share your priorities', link: '/en/share-your-priorities/' },
      ],
    },
  ],
}

const frSidebar = {
  '/fr/': [
    {
      text: 'Cours',
      items: [
        { text: 'Accueil', link: '/fr/' },
        { text: '01 · Pourquoi le SDLC traditionnel échoue', link: '/fr/lectures/lecture-01-why-traditional-sdlc-breaks/' },
        { text: '02 · La boucle agentique', link: '/fr/lectures/lecture-02-the-agentic-loop/' },
        { text: '03 · Ingénierie du contexte', link: '/fr/lectures/lecture-03-context-engineering/' },
        { text: '04 · Conception du harness', link: '/fr/lectures/lecture-04-harness-design/' },
        { text: '05 · Patterns multi-agents', link: '/fr/lectures/lecture-05-multi-agent-patterns/' },
        { text: '06 · Tester les pipelines agentiques', link: '/fr/lectures/lecture-06-testing-agentic-pipelines/' },
        { text: '07 · Observabilité', link: '/fr/lectures/lecture-07-observability/' },
        { text: '08 · Gouvernance humaine', link: '/fr/lectures/lecture-08-human-in-the-loop/' },
      ],
    },
    {
      text: 'Projets',
      items: [
        { text: 'Vue d\'ensemble', link: '/fr/projects/' },
        { text: 'Projet 01 · Vibe Coding vs Harness Engineering', link: '/fr/projects/project-01-baseline-vs-agentic/' },
        { text: 'Projet 02 · Harness minimal', link: '/fr/projects/project-02-minimal-harness/' },
        { text: 'Projet 03 · Pipeline multi-agents', link: '/fr/projects/project-03-multi-agent-pipeline/' },
      ],
    },
    {
      text: 'Ressources',
      items: [
        { text: 'Bibliothèque', link: '/fr/resources/' },
        { text: 'Templates', link: '/fr/resources/templates/' },
        { text: 'Guides', link: '/fr/resources/guides/' },
      ],
    },
  ],
}

export default defineConfig({
  base: '/Blog-Agentic-SDLC/',

  locales: {
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'Agentic SDLC',
      description: 'A practical course on AI-driven software development lifecycles',
      themeConfig: {
        search: {
          provider: 'local',
        },
        nav: [
          { text: 'Lectures', link: '/en/lectures/lecture-01-why-traditional-sdlc-breaks/' },
          { text: 'Projects', link: '/en/projects/' },
          { text: 'Resources', link: '/en/resources/' },
          { text: 'Share your priorities', link: '/en/share-your-priorities/' },
        ],
        sidebar: enSidebar,
      },
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/',
      title: 'SDLC Agentique',
      description: 'Un cours pratique sur les cycles de développement logiciel pilotés par l\'IA',
      themeConfig: {
        search: {
          provider: 'local',
        },
        nav: [
          { text: 'Cours', link: '/fr/lectures/lecture-01-why-traditional-sdlc-breaks/' },
          { text: 'Projets', link: '/fr/projects/' },
          { text: 'Ressources', link: '/fr/resources/' },
          {
            text: 'Enquête ↗',
            link: 'https://github.com/nboitout/agentic-sdlc-survey',
          },
        ],
        sidebar: frSidebar,
      },
    },
  },

  themeConfig: {
    logo: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nboitout/Blog-Agentic-SDLC' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Nicolas Boitout',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/Blog-Agentic-SDLC/favicon.svg' }],
  ],
})
