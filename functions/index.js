import { layout } from "../lib/render";
import { getPosts } from "../lib/api";
import { SITE, canonical, sanitizeSlug, cardImage } from "../lib/config";

// ======================
// MAIN
// ======================
export async function onRequest(context) {
  try {

    const reqUrl = new URL(context.request.url);

    const page = parseInt(reqUrl.searchParams.get("page")) || 1;

    const robotsMeta = page > 1
      ? '<meta name="robots" content="noindex,follow">'
      : '';

    // ======================
    // SAFE FETCH
    // ======================
    const posts = await getPosts().catch(() => []);

    if (!Array.isArray(posts)) {
      return new Response("Posts invalid", { status: 500 });
    }

    // ======================
    // PAGINATION
    // ======================
    const perPage = 12;

    const totalPage = Math.max(
      1,
      Math.ceil(posts.length / perPage)
    );

    const start = (page - 1) * perPage;

    const currentPosts = posts.slice(
      start,
      start + perPage
    );

    // ======================
    // GRID
    // ======================
    const grid = currentPosts.map(p => {

      const slug = sanitizeSlug(p?.slug || "");

      const title = p?.title || "Untitled";

      return `
      <div class="card">
        <a href="/post/${slug}">
          ${cardImage(`/og/${slug}`, title)}
          <h3>${title}</h3>
        </a>
      </div>
      `;

    }).join("");

    // ======================
    // RENDER
    // ======================
    return layout({

      title: "Auto Blog Modern",

      description:
        "Artikel otomatis + SEO + cepat",

      canonical: canonical(
        page > 1
          ? "/?page=" + page
          : "/"
      ),

      // ======================
      // SCHEMA
      // ======================
      schema: `
${robotsMeta}

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"WebSite",
  "name":"${SITE.name}",
  "url":"${SITE.domain}"
}
</script>
`,

      // ======================
      // CONTENT
      // ======================
      content: `

<div class="hero">
  <h1>🚀 ${SITE.name}</h1>
  <p>
    Artikel SEO, tutorial,
    dan teknologi terbaru
  </p>
</div>

<section class="seo-content">
  <h2>Blog SEO & Teknologi</h2>

  <p>
    Website ini menyediakan berbagai
    artikel seputar SEO,
    digital marketing,
    dan teknologi terbaru.
  </p>
</section>

<section>

  <h2>Kategori Populer</h2>

  <div class="grid">

    <a class="card" href="/kategori/seo">
      <h3>SEO</h3>
    </a>

    <a class="card" href="/kategori/blog">
      <h3>Blog</h3>
    </a>

    <a class="card" href="/kategori/teknologi">
      <h3>Teknologi</h3>
    </a>

  </div>

</section>

<h2>Artikel Terbaru</h2>

<div class="grid">
  ${grid || "<p>Belum ada artikel.</p>"}
</div>

${pagination(page, totalPage)}

`
    });

  } catch (e) {

    return new Response(
      "Error: " + (e?.message || "Unknown Error"),
      { status: 500 }
    );

  }
}

// ======================
// PAGINATION
// ======================
function pagination(current, total) {

  if (total <= 1) return "";

  let html = `<div class="pagination">`;

  const group = Math.floor(
    (current - 1) / 5
  );

  const start = group * 5 + 1;

  const end = Math.min(
    start + 4,
    total
  );

  // PREV
  if (start > 1) {

    html += `
    <a href="/?page=${start - 1}">
      «
    </a>
    `;

  }

  // NUMBER
  for (let i = start; i <= end; i++) {

    html += `
    <a
      href="/?page=${i}"
      class="${i === current ? "active" : ""}"
    >
      ${i}
    </a>
    `;

  }

  // NEXT
  if (end < total) {

    html += `
    <a href="/?page=${end + 1}">
      »
    </a>
    `;

  }

  html += `</div>`;

  return html;
}
