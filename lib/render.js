import { SITE, url as buildUrl } from "./config";

export const layout = ({
  title = "Auto Blog",
  description = "Artikel terbaru",
  canonical = "",
  image = "",
  schema = "",
  robots = "",
  content = ""
}) => {

  const canonicalUrl = canonical || SITE.domain;

  const ogImage = image || buildUrl("/og/default");

  return new Response(`<!doctype html>
<html amp lang="id">

<head>

<meta charset="utf-8">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<title>${escapeHTML(title)}</title>

<meta name="viewport"
content="width=device-width,minimum-scale=1,initial-scale=1">

<meta name="description"
content="${escapeHTML(description)}">

<link rel="canonical"
href="${canonicalUrl.replace(SITE.ampDomain || "", SITE.domain)}">

${robots || ""}

<!-- OG -->
<meta property="og:title"
content="${escapeHTML(title)}">

<meta property="og:description"
content="${escapeHTML(description)}">

<meta property="og:type"
content="article">

<meta property="og:url"
content="${canonicalUrl}">

<meta property="og:image"
content="${ogImage}">

<meta property="og:site_name"
content="${SITE.name}">

<!-- TWITTER -->
<meta name="twitter:card"
content="summary_large_image">

<meta name="twitter:title"
content="${escapeHTML(title)}">

<meta name="twitter:description"
content="${escapeHTML(description)}">

<meta name="twitter:image"
content="${ogImage}">

<meta name="theme-color"
content="#4f46e5">

<meta name="robots"
content="index,follow,max-image-preview:large">

${schema || ""}

<style amp-boilerplate>
body{
-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
animation:-amp-start 8s steps(1,end) 0s 1 normal both
}
@-webkit-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@-moz-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@-ms-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@-o-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
</style>

<noscript>
<style amp-boilerplate>
body{
-webkit-animation:none;
-moz-animation:none;
-ms-animation:none;
animation:none
}
</style>
</noscript>

<style amp-custom>

:root{
--bg:#ffffff;
--card:#ffffff;
--text:#0f172a;
--muted:#64748b;
--primary:#4f46e5;
--border:#e2e8f0;
}

*{
box-sizing:border-box;
}

body{
margin:0;
font-family:Arial,sans-serif;
background:var(--bg);
color:var(--text);
line-height:1.7;
}

a{
color:var(--primary);
text-decoration:none;
}

img{
max-width:100%;
height:auto;
}

.container{
max-width:800px;
margin:auto;
padding:20px;
}

.header{
padding:16px 20px;
border-bottom:1px solid var(--border);
background:#fff;
}

.logo{
font-weight:700;
font-size:20px;
color:var(--primary);
}

.hero{
padding:50px 20px;
border-radius:16px;
background:linear-gradient(135deg,#4f46e5,#6366f1);
color:#fff;
text-align:center;
margin-bottom:30px;
}

.hero h1{
font-size:32px;
margin:0 0 10px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:20px;
}

.card{
background:var(--card);
border:1px solid var(--border);
border-radius:14px;
padding:14px;
overflow:hidden;
}

.card h3{
margin:10px 0 0;
font-size:18px;
}

.post h1{
font-size:30px;
margin:15px 0;
}

.post-content{
line-height:1.9;
font-size:17px;
}

.post-content h2,
.post-content h3{
margin-top:30px;
}

amp-img{
border-radius:14px;
overflow:hidden;
background:#f1f5f9;
}

.pagination{
display:flex;
justify-content:center;
gap:8px;
margin:40px 0;
flex-wrap:wrap;
}

.pagination a{
padding:8px 12px;
border-radius:8px;
border:1px solid var(--border);
color:var(--text);
}

.pagination a.active{
background:var(--primary);
color:#fff;
}

.breadcrumb{
font-size:14px;
margin-bottom:15px;
color:var(--muted);
}

.footer{
text-align:center;
padding:40px 20px;
border-top:1px solid var(--border);
margin-top:50px;
color:var(--muted);
font-size:14px;
}

</style>

</head>

<body>

<header class="header">
<div class="logo">
⚡ ${SITE.name}
</div>
</header>

<main class="container">

${String(content || "")
.replace(
/<img([^>]*?)src="([^"]+)"([^>]*?)alt="([^"]*)"([^>]*?)width="([^"]+)"([^>]*?)height="([^"]+)"([^>]*)>/gi,
'<amp-img layout="responsive" src="$2" alt="$4" width="$6" height="$8"></amp-img>'
)}

</main>

<footer class="footer">
© ${new Date().getFullYear()} ${SITE.name}
</footer>

</body>
</html>`, {
    headers: {
      "content-type": "text/html;charset=UTF-8"
    }
  });

};

function escapeHTML(str = "") {
  return String(str)
    .replace(/&(?!(amp|lt|gt|quot);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
