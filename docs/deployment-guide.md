# Website Deployment & Production Hosting Guide

This guide details step-by-step instructions for deploying the **ApexGlobal Impex** international import-export website to modern production hosting platforms.

---

## 1. Static Architecture Advantages

The website is engineered entirely with clean **HTML5, CSS3, modern Bootstrap 5.3, and Vanilla JavaScript**.
- **Zero build step required:** No complex Webpack, Vite, or Node compilation is mandatory.
- **Instant load times & ultra-high reliability:** Can be served from global edge CDNs for sub-100ms response times worldwide.
- **Maximum security:** No vulnerable server runtime, no SQL database injection vectors, and no exposed server secrets.

---

## 2. Recommended Hosting Providers

### Option A: Cloudflare Pages (Recommended for Global B2B Latency)
Cloudflare's global edge network spans 300+ cities in 100+ countries, ensuring international buyers in Dubai, Singapore, Rotterdam, or New York experience instant load times.

1. Create a free account at [Cloudflare](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** → **Create application** → **Pages**.
3. Choose **Connect to Git** (connect your GitHub repository) or drag-and-drop the website root folder.
4. **Build settings:**
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `/` (or root `.`)
5. Click **Deploy Site**.
6. Set up your custom domain (e.g. `www.apexglobalimpex.com`) under **Custom Domains** with automatic free SSL/TLS certificate.

### Option B: Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Click **Add new site** → **Deploy manually** (drag and drop the project folder) or connect via GitHub.
3. Build command: *(none)*, Publish directory: `.`
4. Under **Domain management**, add your custom domain. Free Let's Encrypt SSL is issued automatically.

### Option C: Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New Project** and select your Git repository.
3. Framework Preset: `Other`.
4. Root Directory: `./`.
5. Click **Deploy**.

### Option D: Traditional Apache / Nginx / cPanel Hosting
1. Compress all website files (preserving `assets/`, `index.html`, etc.) into a `.zip` archive.
2. In cPanel, open **File Manager** and upload the archive into `public_html/`.
3. Extract files into the root of `public_html/`.
4. Ensure your server forces HTTPS and redirects `non-www` to `www` (or vice-versa) via `.htaccess` (Apache) or `nginx.conf`.

---

## 3. Production Domain & URL Updates

Before launching publicly, update the production domain placeholder across these files:

1. **`assets/js/config.js`:**
   - Update `SITE_CONFIG.contact.whatsappNumber` with your live business WhatsApp number.
   - Update official email addresses, corporate telephone, and office address.
   - Update verified social media profile links (LinkedIn, YouTube, etc.).

2. **`robots.txt`:**
   - Confirm `Sitemap: https://yourdomain.com/sitemap.xml`.

3. **`sitemap.xml`:**
   - Replace `https://www.apexglobalimpex.com` with your live registered domain.

4. **HTML `<head>` tags in all 6 pages:**
   - Update canonical URL `<link rel="canonical" href="...">`.
   - Update `og:url` and `og:image` tags.
   - Update the Organization JSON-LD schema URL.

---

## 4. HTTPS & Security Headers

Ensure your web server or CDN enforces HTTP Strict Transport Security (HSTS):
- Force redirect from `http://` to `https://`.
- Set headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
