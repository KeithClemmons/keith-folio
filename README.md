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

Asset paths in that folder are relative, so the same files open from a web root or straight from disk (`index.html`). Do not upload the `out` folder itself as a subdirectory, and do not run a Node process on the host. Apache can use the included `.htaccess`, which sets the directory index and points missing paths at `404.html`. Leave PHP enabled so `contact.php` can send mail. The mailbox `keith@keithclemmons.com` needs to exist on that hosting account.
