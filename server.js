var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
var cors = require("cors");
bodyParser = require("body-parser");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage }).single("file");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

router.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    return res.status(200).send(req.file);
  });
});


router.post("/send-message", (req, res) => {
  const output = `
    <h1>You have a new contact request</h1>
    <h3>Contact Details</h3>
    <ul style="list-style-type: decimal; ">
     ${req.body.name ? `<li>Name: ${req.body.name}</li>` : ""}
     ${req.body.role ? `<li>Name: ${req.body.role}</li>` : ""}
     ${req.body.email ? `<li>Name: ${req.body.email}</li>` : ""}
     ${req.body.email ? `<li>Name: ${req.body.email}</li>` : ""}
     ${req.body.company ? `<li>Name: ${req.body.company}</li>` : ""}
     ${req.body.company_url ? `<li>Name: ${req.body.company_url}</li>` : ""}
    </ul>
    <h2>Rating: </h2>
    <table style="border: 1px solid #ccc;  border-collapse: collapse">
            <tr>
                <th style="border: 1px solid #ccc; padding: 5px">Fundraising & Company</th>
                <th style="border: 1px solid #ccc; padding: 5px">Market</th>
                <th style="border: 1px solid #ccc; padding: 5px">Service</th>
                <th style="border: 1px solid #ccc ; padding: 5px">Management</th>
                <th style="border: 1px solid #ccc ; padding: 5px">Overall-Rating</th>
            </tr>
            <tr>

                ${
    req.body.rating
      ? `
                    <td style="border: 1px solid #ccc; padding: 5px"> ${req.body.rating.fundCompanyRating}</td>
                `
      : ""
    }
                ${
    req.body.rating
      ? `
                    <td style="border: 1px solid #ccc; padding: 5px"> ${req.body.rating.marketRating}</td>
                `
      : ""
    }
                ${
    req.body.rating
      ? `
                    <td style="border: 1px solid #ccc; padding: 5px"> ${req.body.rating.serviceRating}</td>
                `
      : ""
    }
                ${
    req.body.rating
      ? `
                    <td style="border: 1px solid #ccc; padding: 5px"> ${req.body.rating.managementRating}</td>
                `
      : ""
    }
                ${
    req.body.rating
      ? `
                    <td style="border: 1px solid #ccc; padding: 5px"> ${req.body.rating.overallRating}</td>
                `
      : ""
    }
            </tr>
    </table>

    <h3>Message: </h3>
    ${req.body.message ? `    <p>${req.body.message}</p> ` : ""}
  `;

  const uploads = "src/assets/uploads/";
  let filepath = "";
  let fileName = "";
  fs.readdirSync(uploads).forEach(file => {
    filepath += __dirname + "/" + path.join(uploads, file);
    fileName += file;
  });
  let attach = [
    {
      filename: fileName,
      path: filepath
    }
  ];
  var transporter = nodemailer.createTransport({
    //NOTE: if you use your mail host then uncomment
    // host: 'mail.yourdomain.com',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: Credential.USER,
    //   pass: Credential.PASS
    // },
    // tls:{
    //   rejectUnauthorized:false
    // }

    service: "gmail", // NOTE: https://myaccount.google.com/lesssecureapps need to go and allow permission
    auth: {
      user: "yourgmail@gmail.com",
      pass: "yourpass"
    }
  });
  let mailOptions = {}
  if (fileName != '') {
    mailOptions = {
      from: `"Your Contact " <yourgmail@gmail.com>`,
      to: "yourgmail@gmail.com",
      subject: "Your Subject Here",
      html: output,
      attachments: attach
    };
  } else {
    mailOptions = {
      from: `"Your Contact " <mdalamin6554@gmail.com>`,
      to: "yourpassgmail@gmail.com",
      subject: "Your Subject Here",
      html: output,
    };
  }

  transporter.sendMail(mailOptions, function (err, info) {
    const uploads = "src/assets/uploads/";
    fse.emptyDirSync(uploads);
    if (err) res.json(err);
    else res.json(info);
  });
});

app.use("/", router);
app.listen(3000, () => console.log("Server Started...."));
