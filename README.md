# Dev Recipes

Dev Recipes is a recipe publishing site built on [Payload](https://payloadcms.com) and [Next.js](https://nextjs.org). It includes a Postgres-backed CMS with a full admin panel, and a server-rendered front-end for browsing recipes and content pages, localized into English and Spanish.

Core features:

- [Collections & Globals](#collections--globals)
- [Access Control](#access-control)
- [Layout Builder](#layout-builder)
- [Localization](#localization)
- [Draft & Live Preview](#draft--live-preview)
- [On-demand Revalidation](#on-demand-revalidation)
- [SEO, Search & Redirects](#seo-search--redirects)
- [Scheduled Publishing](#scheduled-publishing)
- [Recipe Notifications (Braze)](#recipe-notifications-braze)

## Quick Start

1. `cp .env.example .env` to copy the example environment variables
2. `pnpm install && pnpm dev` to install dependencies and start the dev server
3. Open `http://localhost:3000` in your browser

Follow the on-screen instructions to log in and create your first admin user. Changes made in `./src` are reflected automatically.

## Collections & Globals

- **Recipes** — individual dishes with ingredients, instructions, and a layout-builder-enabled body. Draft-enabled (see [Draft & Live Preview](#draft--live-preview)).
- **Pages** — general content pages, also layout-builder- and draft-enabled.
- **Media** — uploads used by recipes and pages, with pre-configured image sizes and focal point.
- **Categories** — a nestable taxonomy used to group recipes.
- **Users** — auth-enabled; see [Access Control](#access-control) for roles.
- **Header** / **Footer** (globals) — nav links and other data shared across the site.

## Access Control

- `users`: users can log into the admin panel and edit content. Each user has one or more roles (`admin`, `merchandising`) via the `roles` field, available to access control checks and saved to the JWT.
- `recipes` / `pages`: published content is publicly readable; only logged-in users can create, update, or delete.

## Layout Builder

Pages and recipes are built from the following blocks:

- Hero
- Content
- Media
- Call To Action
- Archive
- Form
- **Shopping List** — a static, sample-data placement block. A merchandiser controls where it appears on a page; its contents (the list items) are meant to be driven by per-user application state rather than editorial content.
- **Meal Plan** — assigns recipes to days of the week, pulling live recipe data (title, image, prep/cook time, servings) from the `recipes` collection for a hardcoded set of slugs.

## Localization

Content is localized into English (`en`, default) and Spanish (`es`) via Payload's [Localization](https://payloadcms.com/docs/configuration/localization) config in `payload.config.ts`, with `fallback` enabled so untranslated fields fall back to the default locale.

On the front-end, the default locale is served unprefixed at the root (e.g. `/recipes/classic-margherita-pizza`) and all other locales are prefixed (e.g. `/es/recipes/classic-margherita-pizza`). This is handled by `src/proxy.ts`, which rewrites unprefixed requests internally to the `[locale]` route segment, and by `src/utilities/i18n.ts`, which provides the shared `Locale` type and `localizePath` helper used throughout the front-end and admin (see `LocaleSwitcher`) to build locale-aware links.

## Draft & Live Preview

Recipes and pages use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` enabled, so new or edited content is saved as a draft and stays off the public site until published. A secure preview URL lets you view a draft before publishing, and Live Preview renders the resulting page as you edit, with full SSR support.

## On-demand Revalidation

`afterChange` hooks on recipes, pages, and the header/footer globals trigger Next.js on-demand revalidation so published changes show up on the front-end without a full rebuild.

> Note: if an image has been changed (e.g. cropped), you'll need to republish the page it's used on to revalidate the Next.js image cache.

## SEO, Search & Redirects

- **SEO** — the [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) gives per-document control over meta title, description, and image from the admin panel.
- **Search** — the [Payload Search Plugin](https://payloadcms.com/docs/plugins/search) indexes recipes for SSR search.
- **Redirects** — the [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects) lets you map old URLs to new ones from the admin panel.

## Scheduled Publishing

[Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) is configured via the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs), so a draft can be set to publish (or a published doc to unpublish) at a future time. Jobs run on a cron schedule.

## Recipe Notifications (Braze)

`src/collections/Recipes/hooks/notifyBrazeOfNewRecipe.ts` is an `afterChange` hook that fires the moment a recipe first transitions to `published`, simulating a call out to Braze to trigger a "new recipe" push notification. The actual API call is stubbed out in `src/utilities/braze.ts` (it logs what would be sent rather than hitting a real Braze endpoint), so the hook can be exercised without credentials — publish a recipe in the admin panel and check the server logs.

## Working with Postgres

By default the Postgres adapter uses `push: true` in development, so schema changes from adding/editing fields or collections are applied automatically — no migrations needed locally.

For production, set `push: false` and manage schema changes explicitly with migrations:

```bash
pnpm payload migrate:create   # create a migration from your current config
pnpm payload migrate          # run any pending migrations
```

### Docker

This repo includes a `docker-compose.yml`. To run locally with Docker:

1. `cp .env.example .env`
2. `docker-compose up`
3. Open `http://localhost:3000` and follow the on-screen instructions to create your first admin user

### Seed

Seed the database with sample pages and recipes via the "seed database" link in the admin panel. This also creates a demo user:

- Email: `demo-author@example.com`
- Password: `password`

> NOTICE: seeding is destructive — it drops the current database and repopulates it from the seed data. Only run this if you're starting fresh or can afford to lose current data.

## Production

1. `pnpm build` — builds a production-ready bundle into `.next`
2. `pnpm start` — runs Node in production and serves the app
