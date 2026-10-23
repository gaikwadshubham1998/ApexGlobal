# ApexGlobal Impex - International Import-Export & Trading Website

A modern, high-conversion, production-ready multi-page website built for an international import-export and merchant trading company based in India.

Designed to establish trust with overseas buyers, suppliers, wholesalers, and commercial partners across global trade corridors.

---

## 1. Project Overview & Architecture

- **Technology Stack:** Clean HTML5, CSS3, Bootstrap 5.3 (CDN), and Vanilla JavaScript.
- **Zero Heavy Frameworks:** No React, Angular, or Vue overhead. Super fast, zero build-step required, and instantly maintainable by any web developer.
- **Visual Design:** High-trust corporate B2B palette — Deep Navy Blue (`#102A43`), Midnight Blue (`#0B1B2B`), Warm Trade Gold (`#D9A441`), and crisp neutral surfaces (`#F8FAFC`).
- **Typography:** Google Font `Plus Jakarta Sans` with robust system fallbacks.
- **Vector Assets:** High-resolution SVG illustrations for shipping logistics, container vessels, trade corridors, product categories, and industrial components.
- **Direct WhatsApp Click-to-Chat:** Complete integration with pre-filled, URL-encoded trade inquiries on headers, product cards, modals, and the contact form.

---

## 2. Website Structure & Pages

The project contains complete, responsive, and functional pages:

| Page | Filename | Description |
| :--- | :--- | :--- |
| **Home** | `index.html` | High-impact hero, metrics bar, enterprise introduction, 4 core product categories, trade services, 5-step trade workflow, trade corridors map, FAQ preview, and business enquiry banner. |
| **About Us** | `about.html` | Company background, mission/vision, core values, supplier/buyer relationship approach, quality assurance, inspection coordination, and target corridors. |
| **Products** | `products.html` | Interactive B2B product catalogue with category filter tabs, live search input, specification tables, MOQ chips, "Request RFQ" modal, and direct WhatsApp enquiry links. |
| **Services** | `services.html` | Detailed breakdown of export merchant trading, import sourcing, supplier vetting, trade documentation coordination, logistics, Incoterms 2020 (FOB, CIF, CFR, EXW), and trading roadmap. |
| **Contact Us** | `contact.html` | Official channels, office address, Google maps district embed, corporate registrations note, and interactive 10-field business enquiry form with validation, WhatsApp generator, and on-screen copyable payload. |
| **FAQ** | `faq.html` | Comprehensive accordion questions categorized into Products & Sourcing, Pricing & Payments (LC/TT), and Shipping & Inspections (SGS/TUV, COO, Phytosanitary), with live FAQ keyword search. |
| **404 Page** | `404.html` | SEO-friendly, branded error page directing visitors back to products and trading desk. |
| **Privacy Policy** | `privacy-policy.html` | Thorough B2B data protection policy with WhatsApp communication disclosures. |
| **Terms of Trading** | `terms.html` | Commercial terms, Incoterms governance, quotation validity, and legal disclaimers. |
| **Robots & Sitemap** | `robots.txt`, `sitemap.xml` | Search engine crawler rules and XML sitemap ready for Google Search Console submission. |

---

## 3. Directory Layout

```text
importExport/
├── index.html                      # Homepage
├── about.html                      # About Us
├── products.html                   # Product Catalogue with filter & modal
├── services.html                   # Services & Incoterms breakdown
├── contact.html                    # Contact details & 10-field enquiry form
├── faq.html                        # FAQ & Trade Terms accordion
├── 404.html                        # Custom 404 error page
├── privacy-policy.html             # Privacy policy
├── terms.html                      # Terms of trading
├── robots.txt                      # Search engine directives
├── sitemap.xml                     # XML Sitemap for Search Console
├── README.md                       # Master documentation (this file)
│
├── assets/
│   ├── css/
│   │   └── style.css               # Master responsive CSS & design system tokens
│   ├── js/
│   │   ├── config.js               # Centralized business configuration
│   │   ├── main.js                 # Global interactions, dynamic config hydration, filters
│   │   └── contact-form.js         # Form validation & WhatsApp URL encoding
│   └── images/
│       ├── logo.svg                # Brand logo vector in Navy & Gold
│       ├── favicon.svg             # Clean favicon vector
│       ├── hero-logistics.svg      # Modern container mega-vessel hero vector
│       ├── world-routes.svg        # Strategic trade corridors map
│       ├── about-enterprise.svg    # Enterprise sourcing architecture graphic
│       ├── cat-agro.svg            # Agro commodities category banner
│       ├── cat-industrial.svg      # Industrial engineering category banner
│       ├── cat-minerals.svg        # Chemicals & minerals category banner
│       ├── cat-textiles.svg        # Textiles & packaging category banner
│       ├── prod-basmati.svg        # 1121 Steam Basmati Rice visual
│       ├── prod-turmeric.svg       # Salem Grade Finger Turmeric visual
│       ├── prod-sesame.svg         # Hulled Sesame Seeds visual
│       ├── prod-valves.svg         # Industrial Cast Steel Valves visual
│       ├── prod-fasteners.svg      # High Tensile Fasteners & Hex Bolts visual
│       ├── prod-flanges.svg        # Stainless Steel Pipe Flanges visual
│       ├── prod-minerals.svg       # Industrial Bentonite Clay visual
│       └── prod-jute.svg           # A-Twill Export Jute Bags visual
│
└── docs/
    ├── deployment-guide.md         # Production hosting & DNS instructions
    ├── seo-checklist.md            # Search console, schema & core web vitals
    └── form-integration-guide.md   # Backend integration (Formspree, REST API)
```

---

## 4. Centralized Business Configuration (`config.js`)

All essential company information is configured in one central file: [`assets/js/config.js`](file:///c:/Users/DELL-PC/OneDrive/Desktop/sgGit/importExport/assets/js/config.js).

When you update this file, the changes automatically populate across headers, footers, contact cards, and WhatsApp click-to-chat links:

```javascript
const SITE_CONFIG = {
  company: {
    name: "ApexGlobal Impex Pvt. Ltd.",
    legalName: "ApexGlobal Impex Private Limited",
    tagline: "Connecting Global Markets Through Quality Trading",
    iecNumber: "[IEC NUMBER - VERIFIED ON REQUEST]",
    gstNumber: "[GSTIN - VERIFIED ON REQUEST]",
    countryOfOperation: "India",
    originCity: "Mumbai, Maharashtra, India",
    address: {
      full: "Trade Center Tower, Suite 402, BKC, Mumbai, Maharashtra 400051, India"
    }
  },
  contact: {
    whatsappNumber: "919699564112", // International format without +, spaces or dashes
    whatsappDisplay: "+91 96995 64112",
    phone: "+91 22 6123 4567",
    email: "trade@apexglobalimpex.com"
  },
  social: {
    linkedin: "https://www.linkedin.com/company/your-company",
    facebook: "https://www.facebook.com/your-company",
    instagram: "https://www.instagram.com/your-company",
    youtube: "https://www.youtube.com/@your-company"
  }
};
```

---

## 5. How to Run Locally

You can test the website immediately using any local web server:

### Option 1: Python HTTP Server (Built-in)
```bash
# In the project directory:
python -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Node.js `serve` or `http-server`
```bash
npx -y serve .
```

### Option 3: Direct Browser Launch
Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox. All relative links, SVGs, styles, and scripts will load smoothly.

---

## 6. Testing & Quality Assurance Report

The website has been audited against all requirements:
1. **Multi-Page Completeness:** All 6 main HTML pages (`index.html`, `about.html`, `products.html`, `services.html`, `contact.html`, `faq.html`) + `404.html`, `privacy-policy.html`, and `terms.html` exist with full, rich content.
2. **Navigation Flow:** All menu items, footer links, breadcrumbs, and internal anchor links point to existing pages with zero broken links.
3. **Form Validation:** All 10 form fields are validated with accessible error prompts, preventing premature or duplicate submissions.
4. **WhatsApp URL Encoding:** Produces exact required prefilled business enquiry format, using unspaced international phone number parameters.
5. **Responsive Layouts:** Bootstrap 5.3 responsive grid verified for mobile devices (320px+), tablets, laptops, and desktop screens without horizontal overflow.
6. **No Fabricated Claims:** Zero fabricated certifications or fake partnerships. Clear editable notices (`editable-notice-pill`) mark details requiring verified corporate input.
7. **SEO Foundations:** Organization, WebSite, and FAQPage JSON-LD structured data included, accompanied by `robots.txt` and `sitemap.xml`.
