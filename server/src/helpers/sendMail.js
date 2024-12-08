const nodemailer = require("nodemailer");

const sendMail = ({ email, titleMail, html }) => {
  // Cấu hình transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server, ví dụ Gmail
    port: 587, // Cổng SMTP, 587 hoặc 465
    secure: false, // true cho 465, false cho các cổng khác
    auth: {
      user: process.env.EMAIL_NAME, // Địa chỉ email của bạn
      pass: process.env.EMAIL_APP_PASSWORD, // Mật khẩu ứng dụng
    },
  });

  // Nội dung email
  const mailOptions = {
    from: '"Ecommerce" <no-reply@ecommerce.com>', // Địa chỉ email gửi đi
    to: email, // Địa chỉ email người nhận
    subject: titleMail, // Tiêu đề email
    //text: "This is a test email sent using Node.js and Nodemailer.", // Nội dung dạng text
    html: html, // Nội dung dạng HTML
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error while sending mail: ", error);
    }
    console.log("Mail sent successfully: ", info.response);
  });
};

module.exports = sendMail;
