/*
 * Minimal build for Cloudflare Pages: content-hashes styles.css and the JS files,
 * rewrites the <link>/<script> references to the hashed names, and copies
 * everything else through untouched into dist/.
 *
 * Fonts and images are deliberately NOT hashed. They're edited by replacing the
 * file (a new photo or font gets a new filename), never patched in place, so the
 * existing filenames already act as stable cache keys. Hashing them would mean
 * rewriting dozens of cross-references (every <picture> source, every @font-face,
 * every OG/JSON-LD image URL) for no real cache-safety benefit.
 */

const esbuild = require("esbuild");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

const HTML_FILES = ["index.html", "privacy.html", "404.html", "pressure-washing-websites.html"];
const PASSTHROUGH = ["assets", "fonts", "robots.txt", "sitemap.xml", "llms.txt", "favicon.ico", "_headers"];

function hash(content) {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
}

function rimraf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

async function build() {
  rimraf(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  // ---- hash + minify CSS and JS ----
  const assetMap = {}; // e.g. "/styles.css" -> "/styles.<hash>.css"

  async function emitCss(srcRelPath, outNameTemplate) {
    const srcPath = path.join(ROOT, srcRelPath);
    const source = fs.readFileSync(srcPath, "utf8");
    const { code } = await esbuild.transform(source, { loader: "css", minify: true });
    const h = hash(code);
    const outName = outNameTemplate.replace("[hash]", h);
    fs.mkdirSync(path.dirname(path.join(DIST, outName)), { recursive: true });
    fs.writeFileSync(path.join(DIST, outName), code);
    assetMap["/" + srcRelPath.replace(/\\/g, "/")] = "/" + outName;
  }

  async function emitJs(srcRelPath, outNameTemplate) {
    const srcPath = path.join(ROOT, srcRelPath);
    const source = fs.readFileSync(srcPath, "utf8");
    const { code } = await esbuild.transform(source, { loader: "js", minify: true });
    const h = hash(code);
    const outName = outNameTemplate.replace("[hash]", h);
    fs.mkdirSync(path.dirname(path.join(DIST, outName)), { recursive: true });
    fs.writeFileSync(path.join(DIST, outName), code);
    assetMap["/" + srcRelPath.replace(/\\/g, "/")] = "/" + outName;
  }

  await emitCss("styles.css", "styles.[hash].css");
  await emitJs("script.js", "script.[hash].js");
  await emitJs("js/nav.js", "js/nav.[hash].js");
  await emitJs("js/footer-year.js", "js/footer-year.[hash].js");

  // ---- rewrite HTML references ----
  for (const file of HTML_FILES) {
    let html = fs.readFileSync(path.join(ROOT, file), "utf8");

    for (const [from, to] of Object.entries(assetMap)) {
      const bare = from.replace(/^\//, ""); // also match the un-prefixed relative form
      const re = new RegExp(`(["'])/?${bare.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\1`, "g");
      html = html.replace(re, `$1${to}$1`);
    }

    fs.writeFileSync(path.join(DIST, file), html);
  }

  // ---- copy everything else through untouched ----
  for (const entry of PASSTHROUGH) {
    const src = path.join(ROOT, entry);
    if (fs.existsSync(src)) copyRecursive(src, path.join(DIST, entry));
  }

  console.log("Built to dist/:");
  for (const [from, to] of Object.entries(assetMap)) console.log(`  ${from} -> ${to}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
