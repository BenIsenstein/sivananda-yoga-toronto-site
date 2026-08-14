/**
 * Minimal Node bootstrap for the Sveltia CMS Auth broker.
 *
 * Converts Node's http req/res to Web-standard Request/Response and delegates
 * to the verbatim upstream logic in `worker.js`. Zero dependencies — uses only
 * Node built-ins (`node:http`) and globals available in Node 20+.
 */
import { createServer } from 'node:http';
import { handleRequest } from './worker.js';

const PORT = process.env.PORT || 3000;

/**
 * Reconstruct the externally-visible request URL. Behind Railway's TLS proxy the
 * socket is plain HTTP, so trust `x-forwarded-proto`/`host` for the public origin
 * (the OAuth redirect_uri and cookies depend on the correct scheme + host).
 * @param {import('node:http').IncomingMessage} req - Node request.
 * @returns {string} Absolute request URL.
 */
const externalUrl = (req) => {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  return `${proto}://${host}${req.url}`;
};

const server = createServer(async (req, res) => {
  try {
    const request = new Request(externalUrl(req), {
      method: req.method,
      headers: req.headers,
    });

    const response = await handleRequest(request, process.env);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.end(await response.text());
  } catch (err) {
    console.error('Broker error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Sveltia CMS Auth broker listening on :${PORT}`);
});
