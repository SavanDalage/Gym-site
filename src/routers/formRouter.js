const express = require("express");
const router = new express.Router();
const sgMail = require("@sendgrid/mail");
const bodyParser = require("body-parser");
const cors = require("cors");

/////////////////////////////////////////
/////////////////////////////////////////

app.post("/forms", (req, res) => {
  const data = req.body;

  const emailParams = {
    Source: "sender@example.com", // Verified email address
    Destination: {
      ToAddresses: ["recipient@example.com"], // Verified email address
    },
    Message: {
      Subject: {
        Data: "Formularz Treningowy - Zgłoszenie",
      },
      Body: {
        Html: {
          Data: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
        },
      },
    },
  };

  ses.sendEmail(emailParams, (err, data) => {
    if (err) {
      console.error(err);
      console.error(err);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent successfully:", data);
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = router;
