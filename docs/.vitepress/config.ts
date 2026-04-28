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

const plSidebar = {
  '/pl/': [
    {
      text: 'Kursy',
      items: [
        { text: 'Start', link: '/pl/' },
        { text: '01 · Dlaczego SDLC zawodzi', link: '/pl/lectures/lecture-01-why-traditional-sdlc-breaks/' },
        { text: '02 · The Agentic Loop', link: '/pl/lectures/lecture-02-the-agentic-loop/' },
        { text: '03 · Context Engineering', link: '/pl/lectures/lecture-03-context-engineering/' },
        { text: '04 · Harness Design', link: '/pl/lectures/lecture-04-harness-design/' },
        { text: '05 · Multi-Agent Patterns', link: '/pl/lectures/lecture-05-multi-agent-patterns/' },
        { text: '06 · Testing Agentic Pipelines', link: '/pl/lectures/lecture-06-testing-agentic-pipelines/' },
        { text: '07 · Observability', link: '/pl/lectures/lecture-07-observability/' },
        { text: '08 · Human-in-the-Loop Governance', link: '/pl/lectures/lecture-08-human-in-the-loop/' },
        { text: '09 · Bibliografia', link: '/pl/lectures/lecture-09-bibliography/' },
      ],
    },
    {
      text: 'Projekty',
      items: [
        { text: 'Overview', link: '/pl/projects/' },
        { text: 'Project 01 · Vibe Coding vs Harness Engineering', link: '/pl/projects/project-01-baseline-vs-agentic/' },
        { text: 'Project 02 · Minimal Harness', link: '/pl/projects/project-02-minimal-harness/' },
        { text: 'Project 03 · Multi-Agent Pipeline', link: '/pl/projects/project-03-multi-agent-pipeline/' },
      ],
    },
    {
      text: 'Zasoby',
      items: [
        { text: 'Library', link: '/pl/resources/' },
        { text: 'Templates', link: '/pl/resources/templates/' },
        { text: 'Guides', link: '/pl/resources/guides/' },
        { text: 'Samoocena', link: '/pl/executive-self-assessment/' },
        { text: 'Kontakt', link: '/pl/share-your-priorities/' },
      ],
    },
  ],
}

const ukSidebar = {
  '/uk/': [
    {
      text: 'Курси',
      items: [
        { text: 'Старт', link: '/uk/' },
        { text: '01 · Чому SDLC ламається', link: '/uk/lectures/lecture-01-why-traditional-sdlc-breaks/' },
        { text: '02 · The Agentic Loop', link: '/uk/lectures/lecture-02-the-agentic-loop/' },
        { text: '03 · Context Engineering', link: '/uk/lectures/lecture-03-context-engineering/' },
        { text: '04 · Harness Design', link: '/uk/lectures/lecture-04-harness-design/' },
        { text: '05 · Multi-Agent Patterns', link: '/uk/lectures/lecture-05-multi-agent-patterns/' },
        { text: '06 · Testing Agentic Pipelines', link: '/uk/lectures/lecture-06-testing-agentic-pipelines/' },
        { text: '07 · Observability', link: '/uk/lectures/lecture-07-observability/' },
        { text: '08 · Human-in-the-Loop Governance', link: '/uk/lectures/lecture-08-human-in-the-loop/' },
        { text: '09 · Бібліографія', link: '/uk/lectures/lecture-09-bibliography/' },
      ],
    },
    {
      text: 'Проєкти',
      items: [
        { text: 'Overview', link: '/uk/projects/' },
        { text: 'Project 01 · Vibe Coding vs Harness Engineering', link: '/uk/projects/project-01-baseline-vs-agentic/' },
        { text: 'Project 02 · Minimal Harness', link: '/uk/projects/project-02-minimal-harness/' },
        { text: 'Project 03 · Multi-Agent Pipeline', link: '/uk/projects/project-03-multi-agent-pipeline/' },
      ],
    },
    {
      text: 'Ресурси',
      items: [
        { text: 'Library', link: '/uk/resources/' },
        { text: 'Templates', link: '/uk/resources/templates/' },
        { text: 'Guides', link: '/uk/resources/guides/' },
        { text: 'Самооцінка', link: '/uk/executive-self-assessment/' },
        { text: 'Контакт', link: '/uk/share-your-priorities/' },
      ],
    },
  ],
}

const remainingLocaleUi = {
  de: { label: 'Deutsch', lang: 'de', title: 'Agentic SDLC', description: 'Ein praktischer Kurs über agentic software delivery', nav: ['Kurse', 'Projekte', 'Ressourcen', 'Selbstbewertung'], side: ['Kurse', 'Projekte', 'Ressourcen', 'Kontakt'], first: '01 · Warum SDLC scheitert', l09: '09 · Bibliografie' },
  es: { label: 'Español', lang: 'es', title: 'Agentic SDLC', description: 'Un curso práctico sobre agentic software delivery', nav: ['Cursos', 'Proyectos', 'Recursos', 'Autoevaluación'], side: ['Cursos', 'Proyectos', 'Recursos', 'Contacto'], first: '01 · Por qué falla el SDLC', l09: '09 · Bibliografía' },
  it: { label: 'Italiano', lang: 'it', title: 'Agentic SDLC', description: 'Un corso pratico sull’agentic software delivery', nav: ['Corsi', 'Progetti', 'Risorse', 'Autovalutazione'], side: ['Corsi', 'Progetti', 'Risorse', 'Contatto'], first: '01 · Perché fallisce il SDLC', l09: '09 · Bibliografia' },
  pt: { label: 'Português', lang: 'pt', title: 'Agentic SDLC', description: 'Um curso prático sobre agentic software delivery', nav: ['Cursos', 'Projetos', 'Recursos', 'Autoavaliação'], side: ['Cursos', 'Projetos', 'Recursos', 'Contato'], first: '01 · Por que o SDLC falha', l09: '09 · Bibliografia' },
  nl: { label: 'Nederlands', lang: 'nl', title: 'Agentic SDLC', description: 'Een praktische cursus over agentic software delivery', nav: ['Cursussen', 'Projecten', 'Resources', 'Self-assessment'], side: ['Cursussen', 'Projecten', 'Resources', 'Contact'], first: '01 · Waarom SDLC faalt', l09: '09 · Bibliografie' },
  sv: { label: 'Svenska', lang: 'sv', title: 'Agentic SDLC', description: 'En praktisk kurs om agentic software delivery', nav: ['Kurser', 'Projekt', 'Resurser', 'Självskattning'], side: ['Kurser', 'Projekt', 'Resurser', 'Kontakt'], first: '01 · Varför SDLC fallerar', l09: '09 · Bibliografi' },
  da: { label: 'Dansk', lang: 'da', title: 'Agentic SDLC', description: 'Et praktisk kursus om agentic software delivery', nav: ['Kurser', 'Projekter', 'Ressourcer', 'Self-assessment'], side: ['Kurser', 'Projekter', 'Ressourcer', 'Kontakt'], first: '01 · Hvorfor SDLC fejler', l09: '09 · Bibliografi' },
  fi: { label: 'Suomi', lang: 'fi', title: 'Agentic SDLC', description: 'Käytännön kurssi agentic software delivery -mallista', nav: ['Kurssit', 'Projektit', 'Resurssit', 'Itsearviointi'], side: ['Kurssit', 'Projektit', 'Resurssit', 'Yhteys'], first: '01 · Miksi SDLC epäonnistuu', l09: '09 · Bibliografia' },
  cs: { label: 'Čeština', lang: 'cs', title: 'Agentic SDLC', description: 'Praktický kurz o agentic software delivery', nav: ['Kurzy', 'Projekty', 'Zdroje', 'Sebehodnocení'], side: ['Kurzy', 'Projekty', 'Zdroje', 'Kontakt'], first: '01 · Proč SDLC selhává', l09: '09 · Bibliografie' },
  hu: { label: 'Magyar', lang: 'hu', title: 'Agentic SDLC', description: 'Gyakorlati kurzus az agentic software delivery témájában', nav: ['Kurzusok', 'Projektek', 'Erőforrások', 'Önértékelés'], side: ['Kurzusok', 'Projektek', 'Erőforrások', 'Kapcsolat'], first: '01 · Miért bukik el az SDLC', l09: '09 · Bibliográfia' },
  hr: { label: 'Hrvatski', lang: 'hr', title: 'Agentic SDLC', description: 'Praktičan tečaj o agentic software delivery', nav: ['Tečajevi', 'Projekti', 'Resursi', 'Samoprocjena'], side: ['Tečajevi', 'Projekti', 'Resursi', 'Kontakt'], first: '01 · Zašto SDLC ne uspijeva', l09: '09 · Bibliografija' },
  ru: { label: 'Русский', lang: 'ru', title: 'Agentic SDLC', description: 'Практический курс об agentic software delivery', nav: ['Курсы', 'Проекты', 'Ресурсы', 'Самооценка'], side: ['Курсы', 'Проекты', 'Ресурсы', 'Контакт'], first: '01 · Почему SDLC ломается', l09: '09 · Библиография' },
  bg: { label: 'Български', lang: 'bg', title: 'Agentic SDLC', description: 'Практически курс за agentic software delivery', nav: ['Курсове', 'Проекти', 'Ресурси', 'Самооценка'], side: ['Курсове', 'Проекти', 'Ресурси', 'Контакт'], first: '01 · Защо SDLC се проваля', l09: '09 · Библиография' },
  sr: { label: 'Српски', lang: 'sr', title: 'Agentic SDLC', description: 'Практичан курс о agentic software delivery', nav: ['Курсеви', 'Пројекти', 'Ресурси', 'Самопроцена'], side: ['Курсеви', 'Пројекти', 'Ресурси', 'Контакт'], first: '01 · Зашто SDLC отказује', l09: '09 · Библиографија' },
  el: { label: 'Ελληνικά', lang: 'el', title: 'Agentic SDLC', description: 'Πρακτικό μάθημα για agentic software delivery', nav: ['Μαθήματα', 'Έργα', 'Πόροι', 'Αυτοαξιολόγηση'], side: ['Μαθήματα', 'Έργα', 'Πόροι', 'Επικοινωνία'], first: '01 · Γιατί αποτυγχάνει το SDLC', l09: '09 · Βιβλιογραφία' },
  tr: { label: 'Türkçe', lang: 'tr', title: 'Agentic SDLC', description: 'Agentic software delivery üzerine pratik bir kurs', nav: ['Dersler', 'Projeler', 'Kaynaklar', 'Öz değerlendirme'], side: ['Dersler', 'Projeler', 'Kaynaklar', 'İletişim'], first: '01 · SDLC neden kırılır', l09: '09 · Bibliyografya' },
}

function makeSidebar(locale, ui) {
  return {
    [`/${locale}/`]: [
      {
        text: ui.side[0],
        items: [
          { text: 'Start', link: `/${locale}/` },
          { text: ui.first, link: `/${locale}/lectures/lecture-01-why-traditional-sdlc-breaks/` },
          { text: '02 · The Agentic Loop', link: `/${locale}/lectures/lecture-02-the-agentic-loop/` },
          { text: '03 · Context Engineering', link: `/${locale}/lectures/lecture-03-context-engineering/` },
          { text: '04 · Harness Design', link: `/${locale}/lectures/lecture-04-harness-design/` },
          { text: '05 · Multi-Agent Patterns', link: `/${locale}/lectures/lecture-05-multi-agent-patterns/` },
          { text: '06 · Testing Agentic Pipelines', link: `/${locale}/lectures/lecture-06-testing-agentic-pipelines/` },
          { text: '07 · Observability', link: `/${locale}/lectures/lecture-07-observability/` },
          { text: '08 · Human-in-the-Loop Governance', link: `/${locale}/lectures/lecture-08-human-in-the-loop/` },
          { text: ui.l09, link: `/${locale}/lectures/lecture-09-bibliography/` },
        ],
      },
      {
        text: ui.side[1],
        items: [
          { text: 'Overview', link: `/${locale}/projects/` },
          { text: 'Project 01 · Vibe Coding vs Harness Engineering', link: `/${locale}/projects/project-01-baseline-vs-agentic/` },
          { text: 'Project 02 · Minimal Harness', link: `/${locale}/projects/project-02-minimal-harness/` },
          { text: 'Project 03 · Multi-Agent Pipeline', link: `/${locale}/projects/project-03-multi-agent-pipeline/` },
        ],
      },
      {
        text: ui.side[2],
        items: [
          { text: 'Library', link: `/${locale}/resources/` },
          { text: 'Templates', link: `/${locale}/resources/templates/` },
          { text: 'Guides', link: `/${locale}/resources/guides/` },
          { text: ui.nav[3], link: `/${locale}/executive-self-assessment/` },
          { text: ui.side[3], link: `/${locale}/share-your-priorities/` },
        ],
      },
    ],
  }
}

function makeLocale(locale, ui) {
  return {
    label: ui.label,
    lang: ui.lang,
    link: `/${locale}/`,
    title: ui.title,
    description: ui.description,
    themeConfig: {
      nav: [
        { text: ui.nav[0], link: `/${locale}/lectures/lecture-01-why-traditional-sdlc-breaks/` },
        { text: 'Widget',  link: '/context-engineering-widget.html' },
        { text: ui.nav[1], link: `/${locale}/projects/` },
        { text: ui.nav[2], link: `/${locale}/resources/` },
        { text: ui.nav[3], link: `/${locale}/executive-self-assessment/` },
      ],
      sidebar: makeSidebar(locale, ui),
    },
  }
}

export default defineConfig({
  base: '/Blog-Agentic-SDLC/',
  ignoreDeadLinks: true, 

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
          { text: 'Widget', link: '/context-engineering-widget.html' },
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
          { text: 'Simulateur', link: '/context-engineering-widget.html' },
          { text: 'Projets', link: '/fr/projects/' },
          { text: 'Ressources', link: '/fr/resources/' },
          { text: 'Auto-évaluation', link: '/fr/executive-self-assessment/' },
        ],
        sidebar: frSidebar,
      },
    },
    de: makeLocale('de', remainingLocaleUi.de),
    es: makeLocale('es', remainingLocaleUi.es),
    it: makeLocale('it', remainingLocaleUi.it),
    pt: makeLocale('pt', remainingLocaleUi.pt),
    nl: makeLocale('nl', remainingLocaleUi.nl),
    pl: {
      label: 'Polski',
      lang: 'pl',
      link: '/pl/',
      title: 'Agentic SDLC',
      description: 'Praktyczny kurs o agentic software delivery',
      themeConfig: {
        nav: [
          { text: 'Kursy', link: '/pl/lectures/lecture-01-why-traditional-sdlc-breaks/' },
          { text: 'Widget', link: '/context-engineering-widget.html' },
          { text: 'Projekty', link: '/pl/projects/' },
          { text: 'Zasoby', link: '/pl/resources/' },
          { text: 'Samoocena', link: '/pl/executive-self-assessment/' },
        ],
        sidebar: plSidebar,
      },
    },
    sv: makeLocale('sv', remainingLocaleUi.sv),
    da: makeLocale('da', remainingLocaleUi.da),
    fi: makeLocale('fi', remainingLocaleUi.fi),
    ro: {
      label: 'Română',
      lang: 'ro',
      link: '/ro/',
      title: 'SDLC Agentic',
      description: 'Un curs practic despre delivery software agentic',
      themeConfig: {
        nav: [
          { text: 'Cursuri', link: '/ro/lectures/lecture-01-why-traditional-sdlc-breaks/' },
          { text: 'Widget', link: '/context-engineering-widget.html' },
          { text: 'Proiecte', link: '/ro/projects/' },
          { text: 'Resurse', link: '/ro/resources/' },
          { text: 'Autoevaluare', link: '/ro/executive-self-assessment/' },
        ],
        sidebar: roSidebar,
      },
    },
    cs: makeLocale('cs', remainingLocaleUi.cs),
    hu: makeLocale('hu', remainingLocaleUi.hu),
    hr: makeLocale('hr', remainingLocaleUi.hr),
    ru: makeLocale('ru', remainingLocaleUi.ru),
    uk: {
      label: 'Українська',
      lang: 'uk',
      link: '/uk/',
      title: 'Agentic SDLC',
      description: 'Практичний курс про agentic software delivery',
      themeConfig: {
        nav: [
          { text: 'Курси', link: '/uk/lectures/lecture-01-why-traditional-sdlc-breaks/' },
          { text: 'Widget', link: '/context-engineering-widget.html' },
          { text: 'Проєкти', link: '/uk/projects/' },
          { text: 'Ресурси', link: '/uk/resources/' },
          { text: 'Самооцінка', link: '/uk/executive-self-assessment/' },
        ],
        sidebar: ukSidebar,
      },
    },
    bg: makeLocale('bg', remainingLocaleUi.bg),
    sr: makeLocale('sr', remainingLocaleUi.sr),
    el: makeLocale('el', remainingLocaleUi.el),
    tr: makeLocale('tr', remainingLocaleUi.tr),
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
