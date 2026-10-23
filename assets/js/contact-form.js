/**
 * ============================================================================
 * APEX GLOBAL IMPEX - CONTACT & BUSINESS ENQUIRY FORM CONTROLLER
 * Form validation, WhatsApp URL encoder, copy payload utility, backend hook
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  const enquiryForm = document.getElementById("businessEnquiryForm");
  if (!enquiryForm) return;

  const submitBtn = document.getElementById("submitEnquiryBtn");
  const formSuccessAlert = document.getElementById("formSuccessAlert");
  const formErrorAlert = document.getElementById("formErrorAlert");
  const payloadPreviewWrap = document.getElementById("payloadPreviewWrap");
  const whatsappPreviewText = document.getElementById("whatsappPreviewText");
  const launchWhatsAppBtn = document.getElementById("launchWhatsAppBtn");
  const copyPayloadBtn = document.getElementById("copyPayloadBtn");

  // Real-time error clearance on user input
  const inputs = enquiryForm.querySelectorAll("input, select, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        this.classList.remove("is-invalid");
      }
    });
  });

  // Handle Form Submission
  enquiryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Reset alert boxes
    if (formSuccessAlert) formSuccessAlert.classList.add("d-none");
    if (formErrorAlert) formErrorAlert.classList.add("d-none");
    if (payloadPreviewWrap) payloadPreviewWrap.classList.add("d-none");

    // Gather Form Data
    const formData = {
      fullName: document.getElementById("enquiryFullName")?.value.trim() || "",
      companyName: document.getElementById("enquiryCompanyName")?.value.trim() || "Not specified",
      email: document.getElementById("enquiryEmail")?.value.trim() || "",
      phone: document.getElementById("enquiryPhone")?.value.trim() || "",
      country: document.getElementById("enquiryCountry")?.value.trim() || "",
      enquiryType: document.getElementById("enquiryType")?.value || "",
      productService: document.getElementById("enquiryProduct")?.value.trim() || "",
      quantity: document.getElementById("enquiryQuantity")?.value.trim() || "To be discussed",
      message: document.getElementById("enquiryMessage")?.value.trim() || "",
      privacyConsent: document.getElementById("enquiryPrivacyConsent")?.checked || false
    };

    // Client-side Validation
    let isValid = true;

    // 1. Full Name
    if (!formData.fullName || formData.fullName.length < 2) {
      markInvalid("enquiryFullName", "Please enter your full name.");
      isValid = false;
    }

    // 2. Business Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      markInvalid("enquiryEmail", "Please enter a valid business email address.");
      isValid = false;
    }

    // 3. Phone with Country Code
    if (!formData.phone || formData.phone.length < 7) {
      markInvalid("enquiryPhone", "Please provide a valid phone number including country code (e.g. +91 ...).");
      isValid = false;
    }

    // 4. Country
    if (!formData.country) {
      markInvalid("enquiryCountry", "Please specify your country of operation.");
      isValid = false;
    }

    // 5. Enquiry Type
    if (!formData.enquiryType) {
      markInvalid("enquiryType", "Please select an enquiry type.");
      isValid = false;
    }

    // 6. Product / Service
    if (!formData.productService) {
      markInvalid("enquiryProduct", "Please indicate the product or service of interest.");
      isValid = false;
    }

    // 7. Message
    if (!formData.message || formData.message.length < 10) {
      markInvalid("enquiryMessage", "Please provide detailed requirements (minimum 10 characters).");
      isValid = false;
    }

    // 8. Privacy Policy Consent
    if (!formData.privacyConsent) {
      markInvalid("enquiryPrivacyConsent", "You must agree to the privacy consent to proceed.");
      isValid = false;
    }

    if (!isValid) {
      if (formErrorAlert) {
        formErrorAlert.textContent = "Please correct the highlighted fields above before submitting.";
        formErrorAlert.classList.remove("d-none");
      }
      return;
    }

    // Prepare WhatsApp Formatted Text
    const companyName = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.company && SITE_CONFIG.company.name) 
      ? SITE_CONFIG.company.name 
      : "ApexGlobal Impex";
      
    const whatsappNumber = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.contact && SITE_CONFIG.contact.whatsappNumber) 
      ? SITE_CONFIG.contact.whatsappNumber 
      : "919699564112";

    const formattedMessage = 
`Hello ${companyName},

I would like to make a business enquiry.

Name: ${formData.fullName}
Company: ${formData.companyName}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
Enquiry Type: ${formData.enquiryType}
Product/Service: ${formData.productService}
Estimated Quantity: ${formData.quantity}
Message: ${formData.message}

Please contact me regarding this enquiry.

Thank you.`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Disable Submit Button to prevent duplicate submissions
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Preparing Enquiry...`;
    }

    try {
      // Check if optional backend endpoint is configured
      const hasBackendEndpoint = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.api && SITE_CONFIG.api.formEndpoint);

      if (hasBackendEndpoint) {
        const response = await fetch(SITE_CONFIG.api.formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error("Server returned an error status: " + response.status);
        }
      }

      // Display Success Alert & WhatsApp Direct Option
      if (formSuccessAlert) {
        formSuccessAlert.classList.remove("d-none");
      }

      if (payloadPreviewWrap && whatsappPreviewText) {
        whatsappPreviewText.textContent = formattedMessage;
        payloadPreviewWrap.classList.remove("d-none");
      }

      if (launchWhatsAppBtn) {
        launchWhatsAppBtn.setAttribute("href", whatsappUrl);
      }

      // Open WhatsApp click-to-chat window in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    } catch (error) {
      console.warn("Backend submission skipped or failed, fallback to direct WhatsApp:", error);
      
      // Fallback: Still display WhatsApp link and payload preview
      if (formSuccessAlert) {
        formSuccessAlert.innerHTML = `<strong>Enquiry generated successfully!</strong> Since direct server routing is optional, your enquiry has been formatted for WhatsApp below.`;
        formSuccessAlert.classList.remove("d-none");
      }
      if (payloadPreviewWrap && whatsappPreviewText) {
        whatsappPreviewText.textContent = formattedMessage;
        payloadPreviewWrap.classList.remove("d-none");
      }
      if (launchWhatsAppBtn) {
        launchWhatsAppBtn.setAttribute("href", whatsappUrl);
      }
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="bi bi-send-check-fill me-2"></i> Submit &amp; Chat on WhatsApp`;
      }
    }
  });

  // Copy Payload Button Handler
  if (copyPayloadBtn && whatsappPreviewText) {
    copyPayloadBtn.addEventListener("click", function () {
      const textToCopy = whatsappPreviewText.textContent;
      navigator.clipboard.writeText(textToCopy).then(function () {
        const originalHtml = copyPayloadBtn.innerHTML;
        copyPayloadBtn.innerHTML = `<i class="bi bi-check2 me-1"></i> Copied!`;
        copyPayloadBtn.classList.replace("btn-outline-secondary", "btn-success");
        setTimeout(function () {
          copyPayloadBtn.innerHTML = originalHtml;
          copyPayloadBtn.classList.replace("btn-success", "btn-outline-secondary");
        }, 2000);
      }).catch(function (err) {
        console.error("Clipboard copy failed: ", err);
      });
    });
  }

  function markInvalid(elementId, errorMessage) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.add("is-invalid");
    let feedback = el.nextElementSibling;
    if (feedback && feedback.classList.contains("invalid-feedback")) {
      feedback.textContent = errorMessage;
    }
    el.focus();
  }
});
