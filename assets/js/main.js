/**
 * ============================================================================
 * APEX GLOBAL IMPEX - MAIN JAVASCRIPT
 * Global interactions, dynamic hydration, product search & filter, modals
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. DYNAMIC CONFIGURATION HYDRATION
  // Hydrates DOM elements marked with data-config attribute from SITE_CONFIG
  hydrateFromConfig();

  // 2. NAVBAR SCROLL EFFECT
  initNavbarScroll();

  // 3. BACK TO TOP BUTTON
  initBackToTop();

  // 4. PRODUCT FILTER & SEARCH (FOR PRODUCTS PAGE)
  initProductCatalog();

  // 5. PRODUCT QUOTE MODAL HANDLER
  initProductQuoteModal();

  // 6. FAQ LIVE SEARCH FILTER (FOR FAQ PAGE)
  initFaqSearch();

  // 7. CURRENT YEAR IN FOOTER
  initCopyrightYear();
});

/**
 * Hydrates DOM elements with data-config attributes from SITE_CONFIG
 */
function hydrateFromConfig() {
  if (typeof SITE_CONFIG === "undefined") return;

  // Update text nodes
  const configElements = document.querySelectorAll("[data-config]");
  configElements.forEach(function (el) {
    const keyPath = el.getAttribute("data-config");
    const val = getNestedValue(SITE_CONFIG, keyPath);
    if (val !== undefined && val !== null) {
      el.textContent = val;
    }
  });

  // Update dynamic href attributes
  const configHrefElements = document.querySelectorAll("[data-config-href]");
  configHrefElements.forEach(function (el) {
    const type = el.getAttribute("data-config-href");
    if (type === "whatsapp") {
      const defaultUrl = SITE_CONFIG.whatsapp.createEnquiryUrl({
        name: "Valued Client",
        enquiryType: "General Trade Enquiry"
      });
      el.setAttribute("href", defaultUrl);
    } else if (type === "phone") {
      el.setAttribute("href", "tel:" + SITE_CONFIG.contact.phoneCallable);
    } else if (type === "email") {
      el.setAttribute("href", "mailto:" + SITE_CONFIG.contact.email);
    } else if (type === "linkedin") {
      el.setAttribute("href", SITE_CONFIG.social.linkedin);
    } else if (type === "facebook") {
      el.setAttribute("href", SITE_CONFIG.social.facebook);
    } else if (type === "instagram") {
      el.setAttribute("href", SITE_CONFIG.social.instagram);
    } else if (type === "youtube") {
      el.setAttribute("href", SITE_CONFIG.social.youtube);
    }
  });
}

/**
 * Safely access nested object properties via dot-notation
 */
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
}

/**
 * Navbar scroll visual transition
 */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-custom");
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // initial check
}

/**
 * Back to top button controller
 */
function initBackToTop() {
  const backBtn = document.getElementById("backToTopBtn");
  if (!backBtn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 350) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  }, { passive: true });

  backBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Product catalog live search and category filter (used on products.html)
 */
function initProductCatalog() {
  const filterButtons = document.querySelectorAll(".filter-tab-btn");
  const searchInput = document.getElementById("productSearchInput");
  const productCards = document.querySelectorAll(".product-catalog-item");
  const noResultsMsg = document.getElementById("noProductResults");

  if (!productCards.length) return;

  let activeCategory = "all";
  let activeSearchTerm = "";

  function filterProducts() {
    let visibleCount = 0;

    productCards.forEach(function (card) {
      const category = card.getAttribute("data-category") || "";
      const title = (card.querySelector(".product-title")?.textContent || "").toLowerCase();
      const desc = (card.querySelector(".product-description")?.textContent || "").toLowerCase();

      const matchesCategory = (activeCategory === "all" || category === activeCategory);
      const matchesSearch = (title.includes(activeSearchTerm) || desc.includes(activeSearchTerm));

      if (matchesCategory && matchesSearch) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      activeCategory = this.getAttribute("data-filter") || "all";
      filterProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      activeSearchTerm = this.value.trim().toLowerCase();
      filterProducts();
    });
  }
}

/**
 * Product specification and quote modal prefiller
 */
function initProductQuoteModal() {
  const quoteModal = document.getElementById("productQuoteModal");
  if (!quoteModal) return;

  quoteModal.addEventListener("show.bs.modal", function (event) {
    const triggerBtn = event.relatedTarget;
    if (!triggerBtn) return;

    const productName = triggerBtn.getAttribute("data-product-name") || "General Trading Product";
    const productCategory = triggerBtn.getAttribute("data-product-category") || "Commodities";
    const productMoq = triggerBtn.getAttribute("data-product-moq") || "Contact for MOQ";

    const titleEl = quoteModal.querySelector("#modalProductName");
    const categoryEl = quoteModal.querySelector("#modalProductCategory");
    const inputProduct = quoteModal.querySelector("#modalInputProduct");
    const moqBadge = quoteModal.querySelector("#modalProductMoq");

    if (titleEl) titleEl.textContent = productName;
    if (categoryEl) categoryEl.textContent = productCategory;
    if (inputProduct) inputProduct.value = productName;
    if (moqBadge) moqBadge.textContent = "Indicative MOQ: " + productMoq;

    // Update the WhatsApp direct button inside modal
    const modalWhatsappBtn = quoteModal.querySelector("#modalWhatsappBtn");
    if (modalWhatsappBtn && typeof SITE_CONFIG !== "undefined") {
      const url = SITE_CONFIG.whatsapp.createProductQuoteUrl(productName, productCategory);
      modalWhatsappBtn.setAttribute("href", url);
    }
  });
}

/**
 * FAQ search filter (for faq.html)
 */
function initFaqSearch() {
  const faqSearchInput = document.getElementById("faqSearchInput");
  const faqItems = document.querySelectorAll(".accordion-item");
  const noFaqResults = document.getElementById("noFaqResults");

  if (!faqSearchInput || !faqItems.length) return;

  faqSearchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach(function (item) {
      const question = (item.querySelector(".accordion-button")?.textContent || "").toLowerCase();
      const answer = (item.querySelector(".accordion-body")?.textContent || "").toLowerCase();

      if (question.includes(query) || answer.includes(query)) {
        item.style.display = "";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (noFaqResults) {
      noFaqResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
}

/**
 * Copyright Year
 */
function initCopyrightYear() {
  const yearEls = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);
}
