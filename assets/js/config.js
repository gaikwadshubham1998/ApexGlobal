/**
 * ============================================================================
 * SITE CONFIGURATION - GLOBAL IMPORT-EXPORT TRADING BUSINESS
 * ============================================================================
 * Central configuration file for all business information, contact details,
 * social links, trade corridors, and WhatsApp messaging templates.
 * 
 * Update your business information here in one place. All scripts and dynamic
 * elements will reflect these settings throughout the website.
 * ============================================================================
 */

const SITE_CONFIG = {
  // Brand & Business Identity
  company: {
    name: "ApexGlobal Impex Pvt. Ltd.",
    legalName: "ApexGlobal Impex Private Limited",
    tagline: "Connecting Global Markets Through Quality Trading",
    establishedYear: "2018", // Demo / Editable
    businessType: "Import, Export & International Merchant Trading",
    iecNumber: "[IEC NUMBER - VERIFIED ON REQUEST]", // Importer Exporter Code placeholder
    gstNumber: "[GSTIN - VERIFIED ON REQUEST]",       // GST placeholder
    countryOfOperation: "India",
    originCity: "Mumbai, Maharashtra, India",
    address: {
      line1: "Trade Center Tower, Suite 402",
      line2: "Bandra Kurla Complex (BKC)",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400051",
      country: "India",
      full: "Trade Center Tower, Suite 402, BKC, Mumbai, Maharashtra 400051, India"
    }
  },

  // Contact Channels
  contact: {
    // International WhatsApp number WITHOUT spaces, plus (+) sign or dashes for api.whatsapp.com
    // Updated to user's direct line: 9699564112 with India +91 country code
    whatsappNumber: "919699564112", 
    whatsappDisplay: "+91 96995 64112",
    
    // Official Business Telephone
    phone: "+91 22 6123 4567",
    phoneCallable: "+912261234567",
    
    // Official Business Email Addresses
    email: "trade@apexglobalimpex.com",
    supportEmail: "info@apexglobalimpex.com",
    exportInquiries: "export@apexglobalimpex.com",
    importInquiries: "import@apexglobalimpex.com",
    
    // Working Hours
    workingHours: "Monday – Saturday: 09:30 AM – 06:30 PM (IST / UTC +5:30)",
    timezone: "IST (UTC+05:30)"
  },

  // Social Media Profiles (Update with verified profile URLs)
  social: {
    linkedin: "https://www.linkedin.com/company/apex-global-impex",
    facebook: "https://www.facebook.com/apexglobalimpex",
    instagram: "https://www.instagram.com/apexglobalimpex",
    youtube: "https://www.youtube.com/@apexglobalimpex",
    twitter: "https://twitter.com/apexglobalimpex"
  },

  // Trade Corridors & Markets (Truthful & editable target markets)
  markets: {
    export: [
      { name: "Middle East & GCC", countries: "UAE, Saudi Arabia, Oman, Qatar, Kuwait" },
      { name: "Southeast Asia", countries: "Vietnam, Malaysia, Singapore, Indonesia, Thailand" },
      { name: "Africa", countries: "Kenya, Nigeria, Tanzania, South Africa, Egypt" },
      { name: "Europe", countries: "UK, Germany, Netherlands, Italy (Target Corridors)" },
      { name: "Americas", countries: "USA, Canada, Brazil (Target Corridors)" }
    ],
    import: [
      { name: "East Asia", focus: "Industrial machinery, electronics components, polymers" },
      { name: "Southeast Asia", focus: "Spices, rubber, palm derivatives, timber" },
      { name: "Middle East", focus: "Petrochemical derivatives, base oils, minerals" },
      { name: "Africa & CIS", focus: "Raw agro commodities, pulses, specialty minerals" }
    ]
  },

  // Primary Product Categories
  categories: [
    {
      id: "agro-commodities",
      name: "Agro Commodities & Spices",
      shortDesc: "Premium grains, organic spices, pulses, oilseeds & dehydrated produce.",
      icon: "bi-flower1",
      tradeType: "Export & Sourcing"
    },
    {
      id: "industrial-hardware",
      name: "Industrial & Engineering Goods",
      shortDesc: "Fasteners, valves, precision casting, metal hardware & electrical components.",
      icon: "bi-gear-wide-connected",
      tradeType: "Export & Import"
    },
    {
      id: "chemicals-minerals",
      name: "Chemicals & Minerals",
      shortDesc: "Industrial grade minerals, pigments, essential salts & basic raw compounds.",
      icon: "bi-droplet-half",
      tradeType: "Import & Trading"
    },
    {
      id: "textiles-fmcg",
      name: "Textiles & Processed Goods",
      shortDesc: "Yarn, fabrics, jute products, and packaged shelf-stable consumer items.",
      icon: "bi-box-seam",
      tradeType: "Export & Wholesale"
    }
  ],

  // WhatsApp Messaging Templates
  whatsapp: {
    // Default greeting generator
    createEnquiryUrl: function(details) {
      const company = SITE_CONFIG.company.name;
      const num = SITE_CONFIG.contact.whatsappNumber;
      
      let message = `Hello ${company},\n\n` +
                    `I would like to make a business enquiry.\n\n` +
                    `Name: ${details.name || '[Not provided]'}\n` +
                    `Company: ${details.company || '[Not provided]'}\n` +
                    `Email: ${details.email || '[Not provided]'}\n` +
                    `Phone: ${details.phone || '[Not provided]'}\n` +
                    `Country: ${details.country || '[Not provided]'}\n` +
                    `Enquiry Type: ${details.enquiryType || 'General Business Enquiry'}\n` +
                    `Product/Service: ${details.product || 'General Trading'}\n` +
                    `Estimated Quantity: ${details.quantity || 'To be discussed'}\n` +
                    `Message: ${details.message || 'Please share product catalogue and trading terms.'}\n\n` +
                    `Please contact me regarding this enquiry.\n\nThank you.`;

      const encoded = encodeURIComponent(message);
      return `https://api.whatsapp.com/send?phone=${num}&text=${encoded}`;
    },

    // Quick product quote click-to-chat
    createProductQuoteUrl: function(productName, productCategory) {
      const company = SITE_CONFIG.company.name;
      const num = SITE_CONFIG.contact.whatsappNumber;
      
      const message = `Hello ${company},\n\n` +
                      `I am interested in sourcing: ${productName} (Category: ${productCategory || 'General'}).\n\n` +
                      `Could you please share the latest commercial quotation, minimum order quantity (MOQ), available packaging specifications, and shipping Incoterms (FOB/CIF)?\n\n` +
                      `Thank you.`;

      return `https://api.whatsapp.com/send?phone=${num}&text=${encodeURIComponent(message)}`;
    }
  },

  // Backend / Form Service Integration
  // Set to null for frontend-only mode (which routes directly to WhatsApp + on-screen copy)
  // Or provide your endpoint e.g., "https://formspree.io/f/your_form_id" or a custom REST API
  api: {
    formEndpoint: null, // "https://api.yoursite.com/v1/enquiries" or "https://formspree.io/f/xyz"
    sendCopyConfirmationEmail: false
  }
};

// Freeze configuration in non-debug environments
if (typeof Object.freeze === 'function') {
  Object.freeze(SITE_CONFIG.company);
  Object.freeze(SITE_CONFIG.contact);
  Object.freeze(SITE_CONFIG.social);
}
