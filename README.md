# Teresa's Birthday Invitation

A static React and Vite invitation site for Teresa Calitis' 49th birthday celebration.

## Local development

Use Node.js 22 or newer.

```sh
npm install
npm run dev
```

## Quality checks

```sh
npm run typecheck
npm run lint
npm run build
```

The production site is generated in `dist/`.

## Deploy with GitHub Pages

A deployment workflow is included at `.github/workflows/deploy.yml`.

1. Push the project to a GitHub repository using the `main` branch.
2. Open **Settings → Pages** in the repository.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`, or run the workflow manually from the **Actions** tab.

The Vite build uses relative asset paths, so it works from either a root site or a repository subpath.

## Update invitation details

Edit `src/data/invitation.js`. It is the single source of truth for names, dates, venue details, RSVP links, and contact information. Replace all entries marked `⚠ CONFIRM` before publishing.

## Built with

- React
- TypeScript and JavaScript
- Vite
- Tailwind CSS
