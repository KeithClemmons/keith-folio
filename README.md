# Keith Clemmons

Personal site for Jason “Keith” Clemmons. One static page: web development, AI systems, and automation; lead developer at [GutRx](https://gutrx.com); the three businesses he owns; a short background; client quotes; and a contact form.

There is no database. The form posts to `contact.php`, which sends the note to Keith’s email from the Hostinger server. The address is not printed on the page. Opening the site from disk shows the form, but mail is sent only after the files are on the host.

The paper-cut ocean along the bottom of the screen is drawn on a canvas by `public/ocean.js`, a plain script with no dependencies. It is loaded as a classic script rather than a module so it also runs when the page is opened from disk. With reduced motion turned on, it draws one still frame.

## Local preview

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server listens on port **43123** ([http://localhost:43123](http://localhost:43123)).

## Build for Hostinger

```bash
npm install
npm run build
```

`next build` writes a static site to `out/`. The files that matter sit at the top of that folder (`index.html`, `404.html`, `_next/`, and the rest). Upload the **contents** of `out/` to the Hostinger web root, usually `public_html`, so `index.html` is directly inside that directory.

Asset paths in that folder are relative, so the same files open from a web root or straight from disk (`index.html`). Do not upload the `out` folder itself as a subdirectory, and do not run a Node process on the host. Leave PHP enabled so `contact.php` can send mail. The mailbox `keith@keithclemmons.com` needs to exist on that hosting account.

## Sharing the web root with WordPress

The existing WordPress site stays installed in the same `public_html`. This site answers at `/`, and every other path (`/music`, `/wp-admin`, and the rest) still goes to WordPress, because WordPress only handles requests for files that do not exist.

- Upload the contents of `out/` on top of `public_html` without deleting anything. None of the exported names collide with WordPress files.
- The build ships no `.htaccess`, `robots.txt`, or `sitemap.xml`, so WordPress keeps its own. Its sitemap stays at `/wp-sitemap.xml`.
- The live `.htaccess` needs these lines at the very top of the file, above the plugin blocks, so `/` serves `index.html` ahead of WordPress’s `index.php`. Keep them outside every `# BEGIN … # END` block, since WordPress, LiteSpeed Cache, Really Simple Security, and Wordfence rewrite their own.

```apache
# BEGIN keith-folio
DirectoryIndex index.html index.php
AddType image/png .png
AddType image/webp .webp
# END keith-folio
```

- After each upload, purge everything in LiteSpeed Cache. Its `CacheLookup on` rule can otherwise keep serving a cached copy of the old WordPress home page at `/`.
- LiteSpeed Cache tells browsers to keep images, CSS, and JavaScript for a year. The `_next/` files and `ocean.js` carry content hashes, so updates still reach visitors. If `keith.jpg` or `og.png` changes, give the new file a new name.
