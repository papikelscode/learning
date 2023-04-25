const nodemailer = require("nodemailer");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);

app.post("/sendFakeMail", (req, res) => {
  let sender = req.body.senderMail;
  let receiver = req.body.receiverMail;
  let subject = req.body.subjectMail;
  let msg = req.body.msgMail;

  let mailTransporter = nodemailer.createTransport({
    service: "Gmail",
      secure: true,
    auth: {

      // this section you will add the client email address best advice it should be a fake account and the password to the app
      user: "emailaccount ",
      pass: "app password",
    },
  });

  let mailDetails = {
    from: sender,
    to: receiver,
    subject: subject,
    text: msg,
  };


    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
        res.send('<script>alert("Error Occured."); window.location = "/";</script>')
        
      } else {
        console.log("Email sent successfully");
        res.send('<script>alert("Email Sent Successfully."); window.location = "/";</script>');
      }
    });

});
