# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Design a SaaS dashboard with analytics charts

## Goal
Build a multi-page SaaS analytics dashboard (Analytix Pro / Lumina Analytics) with sidebar navigation, KPI cards, Recharts charts, transactions table, and full pages for Dashboard, Analytics, Reports, Team, and Settings.

## Project type
dashboard

## Design system — match this exactly
- Color tokens: `--color-primary: #000000`, `--color-on-primary: #ffffff`, `--color-primary-container: #131b2e`, `--color-secondary: #0058be`, `--color-on-secondary: #ffffff`, `--color-secondary-container: #2170e4`, `--color-on-secondary-container: #fefcff`, `--color-background: #f8f9ff`, `--color-on-background: #0b1c30`, `--brand-primary: #2563eb`, `--brand-primary-dark: #1d4ed8`, `--brand-primary-light: #eff6ff`
- Fonts: Plus_Jakarta_Sans, Inter
- Tailwind color keys: brand, primary, primary-dark, primary-light, success, warning, danger, indigo, boxShadow, card, card-hover, plugins, created

## Existing components — reuse these, don't create near-duplicates
- DashboardHeader (components/DashboardHeader.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Sidebar (components/Sidebar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`analytics`, `dashboard`, `header`, `help`, `nav`, `reports`, `settings`, `team`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
