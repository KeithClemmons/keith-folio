# Keith Clemmons

Personal site for Jason “Keith” Clemmons. One static page: web development, AI systems, and automation; lead developer at [GutRx](https://gutrx.com); the three businesses he owns; a short background; client quotes; and a contact form.

There is no database. The form posts to `contact.php`, which sends the note to Keith’s email from the Hostinger server. The address is not printed on the page. Opening the site from disk shows the form, but mail is sent only by the copy on Hostinger.

The paper-cut ocean along the bottom of the screen is drawn on a canvas by `public/ocean.js`, a plain script with no dependencies. It is loaded as a classic script rather than a module so it also runs when the page is opened from disk. With reduced motion turned on, it draws one still frame.

## Local preview

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server listens on port **43123** ([http://localhost:43123](http://localhost:43123)).

## How it is served

Cloudflare serves this site; the older WordPress site keeps running on Hostinger under the same domain.

- A Cloudflare Worker (`worker/index.js`, configured in `wrangler.jsonc`) sits on `keithclemmons.com/*` and `www.keithclemmons.com/*`. Requests that match a file in the static export (`/`, `_next/`, `ocean.js`, `keith.jpg`, and so on) are answered by Cloudflare from the export.
- Every other request (`/music`, `/wp-admin`, `/contact.php`, and the rest of WordPress) is passed through unchanged to Hostinger.
- `contact.php` needs PHP, so `public/.assetsignore` keeps it out of the Cloudflare upload. The copy on Hostinger is the one that runs; upload it there by hand when it changes. The mailbox `keith@keithclemmons.com` needs to exist on that hosting account.
- The build ships no `robots.txt` or `sitemap.xml`, so WordPress keeps its own. Its sitemap stays at `/wp-sitemap.xml`.

## Deploy

Cloudflare Workers Builds watches this repository. Each push to `main` runs `npm run build`, then `npx wrangler deploy`, and the new version is live about a minute later. No upload and no cache purge are needed for this site.

To deploy by hand instead, sign in once with `npx wrangler login`, then run:

```bash
npm run deploy
```

To try the Worker locally, including the pass-through to the live WordPress site:

```bash
npm run build
npm run worker:dev
```

That serves [http://localhost:8799](http://localhost:8799).

## Hostinger fallback

If the Worker route is ever removed, Hostinger answers every request again. The live `.htaccess` there starts with these lines, outside every plugin's `# BEGIN … # END` block, so `/` serves the uploaded `index.html` ahead of WordPress's `index.php`:

```apache
# BEGIN keith-folio
DirectoryIndex index.html index.php
AddType image/png .png
AddType image/webp .webp
# END keith-folio
```

To fall back fully, upload the contents of `out/` on top of `public_html` without deleting anything, then purge LiteSpeed Cache and Cloudflare's cache. Asset paths in `out/` are relative, so the same files also open straight from disk.
