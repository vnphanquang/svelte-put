// src/worker.js
import { Server } from "SERVER";
import { manifest, prerendered } from "MANIFEST";

// ../../node_modules/.pnpm/worktop@0.8.0-next.14/node_modules/worktop/cache/index.mjs
async function e(e3, t2) {
  let n2 = typeof t2 != "string" && t2.method === "HEAD";
  n2 && (t2 = new Request(t2, { method: "GET" }));
  let a2 = await e3.match(t2);
  return n2 && a2 && (a2 = new Response(null, a2)), a2;
}
function t(e3, t2, n2, o2) {
  return (typeof t2 == "string" || t2.method === "GET") && a(n2) && (n2.headers.has("Set-Cookie") && (n2 = new Response(n2.body, n2)).headers.append("Cache-Control", "private=Set-Cookie"), o2.waitUntil(e3.put(t2, n2.clone()))), n2;
}
var n = /* @__PURE__ */ new Set([200, 203, 204, 300, 301, 404, 405, 410, 414, 501]);
function a(e3) {
  if (!n.has(e3.status) || ~(e3.headers.get("Vary") || "").indexOf("*"))
    return false;
  let t2 = e3.headers.get("Cache-Control") || "";
  return !/(private|no-cache|no-store)/i.test(t2);
}
function o(n2) {
  return async function(a2, o2) {
    let r2 = await e(n2, a2);
    if (r2)
      return r2;
    o2.defer((e3) => {
      t(n2, a2, e3, o2);
    });
  };
}

// ../../node_modules/.pnpm/worktop@0.8.0-next.14/node_modules/worktop/cfw.cache/index.mjs
var s = caches.default;
var e2 = t.bind(0, s);
var c = e.bind(0, s);
var r = o.bind(0, s);

// src/worker.js
var server = new Server(manifest);
var prefix = `/${manifest.appDir}/`;
var worker = {
  async fetch(req, env, context) {
    let pragma = req.headers.get("cache-control") || "";
    let res = !pragma.includes("no-cache") && await c(req);
    if (res)
      return res;
    let { pathname } = new URL(req.url);
    if (pathname.startsWith(prefix)) {
      res = await env.ASSETS.fetch(req);
      const cache_control = pathname.startsWith(prefix + "immutable/") ? "public, immutable, max-age=31536000" : "no-cache";
      res = new Response(res.body, {
        headers: {
          "cache-control": cache_control,
          "content-type": res.headers.get("content-type"),
          "x-robots-tag": "noindex"
        }
      });
    } else {
      pathname = pathname.replace(/\/$/, "") || "/";
      let file = pathname.substring(1);
      try {
        file = decodeURIComponent(file);
      } catch (err) {
      }
      if (manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || prerendered.has(pathname)) {
        res = await env.ASSETS.fetch(req);
      } else {
        res = await server.respond(req, {
          platform: { env, context, caches },
          getClientAddress() {
            return req.headers.get("cf-connecting-ip");
          }
        });
      }
    }
    pragma = res.headers.get("cache-control");
    return pragma ? e2(req, res, context) : res;
  }
};
var worker_default = worker;
export {
  worker_default as default
};
