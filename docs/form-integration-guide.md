# Business Enquiry Form & Backend Integration Guide

This guide explains how the business enquiry flow works out of the box, and how to connect an optional server-side backend or form service for automatic inquiry persistence.

---

## 1. How the Default Frontend-Only Flow Works

In frontend-only mode (default):
1. The visitor fills out the 10 fields on `contact.html`.
2. `assets/js/contact-form.js` performs client-side validation on email, phone, country, message, and privacy consent.
3. Upon validation, the script constructs an international B2B formatted message:
   ```text
   Hello [COMPANY NAME],

   I would like to make a business enquiry.

   Name: [FULL NAME]
   Company: [COMPANY NAME]
   Email: [EMAIL]
   Phone: [PHONE]
   Country: [COUNTRY]
   Enquiry Type: [ENQUIRY TYPE]
   Product/Service: [PRODUCT]
   Estimated Quantity: [QUANTITY]
   Message: [MESSAGE]

   Please contact me regarding this enquiry.

   Thank you.
   ```
4. The message is URL-encoded and automatically opens a new browser window/tab with the official WhatsApp click-to-chat API:
   `https://api.whatsapp.com/send?phone=[CONFIGURED_PHONE]&text=[ENCODED_MESSAGE]`
5. **Technical Transparency:** The visitor is clearly informed on screen that opening WhatsApp pre-fills the message, and they must press **Send** in WhatsApp to dispatch it.
6. A **Copy Text** button is provided on screen with a live payload box in case the visitor prefers to email or save the inquiry.

---

## 2. Connecting an Automatic Email / Database Backend

If your business requires enquiries to be automatically saved to a database or sent to your corporate email (in addition to or before WhatsApp), follow one of the approaches below.

### Option A: Using Formspree (No Server Setup Required)

1. Register at [Formspree.io](https://formspree.io/).
2. Create a new form and copy your unique form endpoint URL (e.g. `https://formspree.io/f/mqkbrwza`).
3. Open `assets/js/config.js` and set:
   ```javascript
   api: {
     formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
     sendCopyConfirmationEmail: true
   }
   ```
4. That's it! `contact-form.js` will automatically `POST` the JSON payload to Formspree, save the enquiry, forward it to your business email inbox, and then launch the WhatsApp chat window seamlessly.

---

### Option B: Using Web3Forms (100% Free & Fast)

1. Get an access key at [Web3Forms](https://web3forms.com/).
2. Set your endpoint or access key:
   ```javascript
   api: {
     formEndpoint: "https://api.web3forms.com/submit",
     accessKey: "YOUR_ACCESS_KEY_HERE"
   }
   ```

---

### Option C: Custom Node.js / Express REST API

If you have your own private backend server:

```javascript
// Example Node.js Express endpoint: POST /api/v1/enquiry
app.post("/api/v1/enquiry", async (req, res) => {
  const { fullName, email, phone, country, enquiryType, productService, quantity, message } = req.body;

  // 1. Validate inputs server-side
  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 2. Save enquiry to database (PostgreSQL, MongoDB, etc.)
  await db.enquiries.create({ ...req.body, createdAt: new Date() });

  // 3. Send email notification via SMTP (SendGrid, Postmark, AWS SES)
  await sendAdminNotificationEmail(req.body);

  // 4. Return success response
  return res.status(200).json({ success: true, message: "Enquiry recorded successfully" });
});
```

Then in `assets/js/config.js`, set:
```javascript
api: {
  formEndpoint: "https://api.apexglobalimpex.com/api/v1/enquiry"
}
```

---

## 3. Anti-Spam Protection

When deploying to production with a real backend endpoint:
- Enable **Cloudflare Turnstile** or **Google reCAPTCHA v3** to prevent automated bot submissions.
- Implement server-side rate-limiting (e.g., maximum 5 submissions per IP per 10 minutes).
