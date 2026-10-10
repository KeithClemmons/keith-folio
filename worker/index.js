// Runs only for paths that are not in the static export (see wrangler.jsonc).
// Those belong to WordPress or contact.php on Hostinger, so pass them through
// untouched. On the keithclemmons.com route, a fetch to the same hostname goes
// to the origin server rather than back into this Worker.
const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = new URL(env.ORIGIN);
    url.protocol = origin.protocol;
    url.host = origin.host;
    url.port = origin.port;
    return fetch(new Request(url, request), { redirect: "manual" });
  },
};

export default worker;
