import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const contact = formData.get("contact");
    const email = formData.get("email");
    const file = formData.get("file"); // this is a File object

    if (!name || !contact || !email || !file) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   const mailOptions = {
  from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
  to: process.env.FROM_EMAIL,
  subject: `📄 New Abstract Submission from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}`,
  html: `
    <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New Abstract Submission</h2>
        </div>

        <!-- Body -->
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">
            You’ve received a new abstract submission. Details are below:
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #111827;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Contact:</td>
              <td style="padding: 8px;">${contact}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
            The abstract file is attached with this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 13px; color: #6b7280;">
          © ${new Date().getFullYear()} ${process.env.FROM_NAME}. All rights reserved.
        </div>
      </div>
    </div>
  `,
  attachments: [
    {
      filename: file.name,
      content: buffer,
    },
  ],
};


    const info = await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ success: true, messageId: info.messageId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    );
  }
}
