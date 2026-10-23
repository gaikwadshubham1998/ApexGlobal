# Production SEO & Search Engine Submission Checklist

A comprehensive checklist for indexing the import-export website on major search engines (Google, Bing) and maximizing organic B2B visibility.

---

## 1. Technical SEO Verification

- [x] **Canonical URLs:** Unique `<link rel="canonical">` defined on every HTML page to avoid duplicate content penalties.
- [x] **Page Titles & Meta Descriptions:** Tailored, descriptive titles under 60 characters and meta descriptions under 160 characters.
- [x] **Heading Hierarchy:** Strictly one `<h1>` per page, followed by semantic `<h2>` and `<h3>` tags.
- [x] **Image Alt Text:** All product vectors, diagrams, and logos include descriptive `alt` tags.
- [x] **Mobile Responsiveness:** Tested viewport configuration (`width=device-width, initial-scale=1.0`) with touch-friendly navigation.
- [x] **XML Sitemap:** Clean `sitemap.xml` listing all pages with change frequency and priority.
- [x] **Robots Directive:** `robots.txt` properly configured allowing indexing of all pages while protecting documentation folders.
- [x] **Custom 404 Page:** Branded `404.html` providing intuitive return paths.

---

## 2. Google Search Console Setup

1. Visit [Google Search Console](https://search.google.com/search-console).
2. Add a new property using the **Domain** verification method (via DNS TXT record at your domain registrar).
3. Once verified, go to **Sitemaps** in the left sidebar.
4. Enter `sitemap.xml` and click **Submit**.
5. Monitor the **Page indexing** report to verify that all 6 main pages are crawled and indexed without errors.
6. Use the **URL Inspection Tool** to request immediate indexing for the homepage (`index.html`) and product catalogue (`products.html`).

---

## 3. Bing Webmaster Tools & International Search

1. Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Import your verified Google Search Console property or verify via DNS.
3. Submit `sitemap.xml`.
4. Bing indexing also accelerates visibility across DuckDuckGo and Yahoo search networks.

---

## 4. Structured Data (Schema.org) Validation

The site includes valid JSON-LD schemas:
- **`Organization` Schema:** On `index.html` detailing legal name, address, contact point, and logo.
- **`WebSite` Schema:** Establishing corporate identity.
- **`AboutPage` & `BreadcrumbList`:** On inner pages.
- **`FAQPage` Schema:** On `faq.html` enabling rich snippets with expandable Q&A in Google search results.

**Validation Step:**
- Test your URLs using the official [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema Validator](https://validator.schema.org/).

---

## 5. Social Share Card Validation

Before sharing links on WhatsApp, LinkedIn, or Twitter, validate open graph tags:
- **LinkedIn Post Inspector:** [https://www.linkedin.com/post-inspector/](https://www.linkedin.com/post-inspector/)
- **Twitter / X Card Validator:** Ensure title, description, and preview image render crisply.
- **Facebook Sharing Debugger:** [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)

---

## 6. Core Web Vitals Optimization

The site is optimized for high Lighthouse scores:
- Zero heavy client-side JavaScript frameworks.
- Modern SVG vector illustrations (fast vector rendering with zero artifact blur).
- CSS delivered minified or compressed from CDN.
- Asynchronous font loading and preconnect headers.
