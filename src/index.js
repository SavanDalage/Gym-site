//Index.js

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const port = process.env.PORT || 5500;
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes

sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

// POST endpoint to handle form submissions
// POST endpoint to handle form submissions
// POST endpoint to handle form submissions
app.post("/forms", (req, res) => {
  console.log("Request received at /forms");
  const data = req.body;

  const emailData = {
    to: "nekomimiwolf@gmail.com",
    from: "silownia@peferek.com",
    subject: "Formularz Treningowy - Zgłoszenie",
    text: "New form submission",
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
  };

  sgMail
    .send(emailData)
    .then(() => {
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error sending email", error: error.toString() });
    });
});

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM signal for graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
