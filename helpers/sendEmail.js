const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_KEY } = process.env;

sgMail.setApiKey(SEND_GRID_KEY);

const sendMail = async (data) => {
  try {
    const email = { ...data, from: "nicstyle22@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;

// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
