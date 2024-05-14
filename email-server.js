const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to handle incoming email inquiries
const getPdfPath = (category) => {
  switch (category) {
    case "corporate":
      return "./public/corporate.pdf";
    case "Fashion&Beauty":
      return "./public/fashion_beauty.pdf";
    case "Portraits":
      return "./public/portraits.pdf";
    case "Events":
      return "./public/events.pdf";
    default:
      return null; // Return null for unknown categories
  }
};
app.post("/send-email", async (req, res) => {
  // Extract email details from the request body
  const { senderEmail, name, category } = req.body;
  console.log("Ovo je kategorija", category);
  console.log("ovo je req.body", req.body);

  if (!category) {
    return res.status(400).send("Category is required");
  }

  try {
    // Configure Nodemailer with your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "anaotero.webdev@gmail.com",
        pass: "drnd hjpp uzuf daqi",
      },
    });

    const pdfPath = getPdfPath(category);

    if (!pdfPath) {
      throw new Error("Invalid category"); // Handle unknown categories
    }

    // Define email content
    const mailOptions = {
      from: "anaotero.webdev@gmail.com",
      to: senderEmail,
      subject: "Automated Response with PDF Attachment",
      html: `
      <p>Dear ${name},</p>
      <p>Thank you for your inquiry and interest in our services. We are delighted to assist you in finding the perfect package tailored to your needs.</p>
      <p>Attached, you will find our packages outlined in the PDF document. These packages encompass a range of options designed to suit various preferences and requirements.</p>
      <p>Should you have any questions or require further assistance, please feel free to reply directly to this email.</p>
      <p>Our dedicated team is here to accommodate your unique needs and ensure that your experience with us exceeds your expectations.</p>
      <p>We look forward to the opportunity to serve you and create memorable experiences together.</p>
      <p>Warm regards,</p>
      <p>Maria Duchesne</p>
      <p>Creative Capture</p>
    `,
      attachments: [
        {
          filename: "attachment.pdf",
          path: pdfPath,
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Delete the PDF file after sending the email
    // fs.unlinkSync(pdfPath);

    console.log("Email sent with PDF attachment");
    res.status(200).send("Email sent with PDF attachment");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
