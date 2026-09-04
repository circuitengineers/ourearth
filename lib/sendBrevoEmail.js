// Sends a transactional email via Brevo's HTTP API.
// Docs: https://developers.brevo.com/reference/sendtransacemail

export async function sendBrevoEmail({ to, subject, htmlContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "OurEarth";

  if (!apiKey || !senderEmail) {
    throw new Error("Brevo is not configured (missing BREVO_API_KEY or BREVO_SENDER_EMAIL).");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to.email, name: to.name }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo send failed (${response.status}): ${body}`);
  }

  return response.json();
}

export function buildStoryEmail(story) {
  const categoryLabel = story.category === "other" ? story.custom_category : story.category;

  const subject = `A resident account submitted through OurEarth — ${story.region}`;

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1B1B16;">
      <p style="font-size: 13px; text-transform: none; color: #4A4A3F;">
        Submitted anonymously through OurEarth · Story code ${story.story_code}
      </p>
      <h2 style="font-size: 20px; margin-bottom: 4px;">${categoryLabel} — ${story.region}</h2>
      <blockquote style="font-style: italic; font-size: 16px; line-height: 1.5; border-left: 3px solid #3E7C82; padding-left: 16px; margin: 20px 0;">
        “${story.quote}”
      </blockquote>
      <p style="font-size: 13px; color: #4A4A3F;">
        This account was submitted anonymously and reviewed before sending. No
        personal identifying information is included or held on file. If you'd
        like to respond or need more context, reply to this email and our team
        will relay your response through the platform.
      </p>
    </div>
  `;

  return { subject, htmlContent };
}
