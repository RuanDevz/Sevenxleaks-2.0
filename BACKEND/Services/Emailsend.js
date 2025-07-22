const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  // Email content
  const mailOptions = {
    from: '"VIP Service" <your-email@example.com>',
    to: email,
    subject: 'VIP Membership Confirmation!',
    text: 'Congratulations! You are now a VIP member.',
    html: `
      <h1>Welcome to VIP Access</h1>
      <p>Hello,</p>
      <p>We are excited to inform you that your payment was successful and you are now a VIP member! Enjoy exclusive content, ad-free experiences, and much more.</p>
      <p>Thank you for being a part of our community!</p>
      <p>Best regards, <br/> Your Service Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendConfirmationEmail;
