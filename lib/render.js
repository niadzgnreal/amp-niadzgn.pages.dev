```js
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
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

<title>${escapeHTML(title)}</title>
<meta name="description" content="${escapeHTML(description)}">

<link rel="canonical" href="${canonicalUrl}">

${SITE.ampDomain ? `<link rel="amphtml" href="${canonicalUrl.replace(SITE.domain,SITE.ampDomain)}">` : ""}

${robots || ""}

<!-- AMP -->
<script async src="https://cdn.ampproject.org/v0.js"></script>

<style amp-boilerplate>
body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}
@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
</style>

<noscript>
<style amp-boilerplate>
body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
</style>
</noscript>

<!-- OG -->
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${ogImage}">
<meta property="og:type" content="article">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ogImage}">

${schema || ""}

<style amp-custom>
:root{
--bg:#ffffff;
--card:#ffffff;
--text:#0f172a;
--muted:#64748b;
--primary:#4f46e5;
--border:#e2e8f0;
}

*{box-sizing:border-box}

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

.container{
max-width:800px;
margin:auto;
padding:20px;
}

.header{
position:sticky;
top:0;
background:#fff;
border-bottom:1px solid var(--border);
padding:14px 20px;
z-index:10;
}

.logo{
font-weight:700;
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
}

.card h3{
font-size:18px;
margin:10px 0 0;
}

.post h1{
font-size:30px;
margin:15px 0;
}

.post-content{
line-height:1.9;
font-size:17px;
}

.breadcrumb{
font-size:14px;
margin-bottom:10px;
color:var(--muted);
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

.footer{
text-align:center;
padding:40px;
border-top:1px solid var(--border);
margin-top:50px;
color:var(--muted);
}

amp-img{
border-radius:14px;
overflow:hidden;
}
</style>
</head>
<body>

<header class="header">
<div class="logo">⚡ ${SITE.name}</div>
</header>

<main class="container">
${content
.replace(/<img([^>]*)src="([^"]+)"([^>]*)alt="([^"]*)"([^>]*)width="([^"]+)"([^>]*)height="([^"]+)"([^>]*)>/gi,
'<amp-img layout="responsive" src="$2" alt="$4" width="$6" height="$8"></amp-img>')}
</main>

<footer class="footer">
© ${new Date().getFullYear()} ${SITE.name} — AMP Ready ⚡
</footer>

</body>
</html>`,{
headers:{
"content-type":"text/html;charset=UTF-8"
}
});

}

function escapeHTML(str=""){
return String(str)
.replace(/&(?!(amp|lt|gt|quot);)/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;");
}
