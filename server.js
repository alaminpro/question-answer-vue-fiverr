var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())

router.post('/send-message', (req, res) => {

    const output = `
    <h1>You have a new contact request</h1>
    <h3>Contact Details</h3>
    <ul style="list-style-type: decimal; ">  
      <li>Name: ${req.body.name}</li>
      <li>Role: ${req.body.role}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Email: ${req.body.email}</li>
      <li>Company: ${req.body.company}</li> 
      <li>Company Website: ${req.body.company_url}</li> 
    </ul>
    <h3>Message: </h3> 
    <p>${req.body.message}</p> 
  `;
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

        service: 'gmail', // NOTE: https://myaccount.google.com/lesssecureapps need to go and allow permission
        auth: {
            user: 'mdalamin6554@gmail.com',
            pass: 'Alamin1212'
        }
    });
    let mailOptions = {
        from: `"Your Contact " <mdalamin6554@gmail.com>`,
        to: 'mdalamin6555@gmail.com',
        subject: 'Your Subject Here',
        html: output
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            res.json(err)
        else
            res.json(info)
    });
})

app.use('/', router)
app.listen(3000, () => console.log("Server Started...."))