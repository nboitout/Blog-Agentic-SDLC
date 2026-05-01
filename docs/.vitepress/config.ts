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
        { text: '09 · Bibliographie', link: '/fr/lectures/lecture-09-bibliography/' },
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
        { text: 'Auto-évaluation dirigeant', link: '/fr/executive-self-assessment/' },
        { text: 'Partager vos priorités', link: '/fr/share-your-priorities/' },
      ],
    },
  ],
}

const roSidebar = {
  '/ro/': [
    {
      text: 'Cursuri',
      items: [
        { text: 'Start', link: '/ro/' },
        { text: '01 · De ce SDLC tradițional eșuează', link: '/ro/lectures/lecture-01-why-traditional-sdlc-breaks/' },
        { text: '02 · The Agentic Loop', link: '/ro/lectures/lecture-02-the-agentic-loop/' },
        { text: '03 · Context Engineering', link: '/ro/lectures/lecture-03-context-engineering/' },
        { text: '04 · Harness Design', link: '/ro/lectures/lecture-04-harness-design/' },
        { text: '05 · Multi-Agent Patterns', link: '/ro/lectures/lecture-05-multi-agent-patterns/' },
        { text: '06 · Testing Agentic Pipelines', link: '/ro/lectures/lecture-06-testing-agentic-pipelines/' },
        { text: '07 · Observability', link: '/ro/lectures/lecture-07-observability/' },
        { text: '08 · Human-in-the-Loop Governance', link: '/ro/lectures/lecture-08-human-in-the-loop/' },
        { text: '09 · Bibliografie', link: '/ro/lectures/lecture-09-bibliography/' },
      ],
    },
    {
      text: 'Proiecte',
      items: [
        { text: 'Overview', link: '/ro/projects/' },
        { text: 'Project 01 · Vibe Coding vs Harness Engineering', link: '/ro/projects/project-01-baseline-vs-agentic/' },
        { text: 'Project 02 · Minimal Harness', link: '/ro/projects/project-02-minimal-harness/' },
        { text: 'Project 03 · Multi-Agent Pipeline', link: '/ro/projects/project-03-multi-agent-pipeline/' },
      ],
    },
    {
      text: 'Resurse',
      items: [
        { text: 'Library', link: '/ro/resources/' },
        { text: 'Templates', link: '/ro/resources/templates/' },
        { text: 'Guides', link: '/ro/resources/guides/' },
        { text: 'Autoevaluare executivă', link: '/ro/executive-self-assessment/' },
        { text: 'Contact', link: '/ro/share-your-priorities/' },
      ],
    },
  ],
}

export default defineConfig({
  base: '/Blog-Agentic-SDLC/',
  ignoreDeadLinks: true,
  markdown: { math: true },

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
          { text: 'Token Cost', link: '/en/interactive/' },
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
      description: "Un cours pratique sur les cycles de développement logiciel pilotés par l'IA",
      themeConfig: {
        search: {
          provider: 'local',
        },
        nav: [
          { text: 'Cours', link: '/fr/lectures/lecture-01-why-traditional-sdlc-breaks/' },
          { text: 'Token Cost', link: '/fr/interactive/' },
          { text: 'Projets', link: '/fr/projects/' },
          { text: 'Ressources', link: '/fr/resources/' },
          { text: 'Auto-évaluation', link: '/fr/executive-self-assessment/' },
        ],
        sidebar: frSidebar,
      },
    },
    ro: {
      label: 'Română',
      lang: 'ro',
      link: '/ro/',
      title: 'SDLC Agentic',
      description: 'Un curs practic despre delivery software agentic',
      themeConfig: {
        nav: [
          { text: 'Cursuri', link: '/ro/lectures/lecture-01-why-traditional-sdlc-breaks/' },
          { text: 'Token Cost', link: '/ro/interactive/' },
          { text: 'Proiecte', link: '/ro/projects/' },
          { text: 'Resurse', link: '/ro/resources/' },
          { text: 'Autoevaluare', link: '/ro/executive-self-assessment/' },
        ],
        sidebar: roSidebar,
      },
    },
  },

  themeConfig: {
    logo: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    },
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nboitout/Blog-Agentic-SDLC' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Nicolas Boitout',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/Blog-Agentic-SDLC/favicon-dots.svg' }],
  ],
})
