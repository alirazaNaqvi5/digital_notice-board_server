const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const nodemailer = require("nodemailer");

var fs = require("fs");


// let transporter = nodemailer.createTransport({
//     pool: true,
//     host: 'mail.biglobe.ne.jp',
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'kobahi-p@mtb.biglobe.ne.jp',
//       pass: "hiro08koba01",
//     },
//   });


// const transporter = nodemailer.createTransport({
//     host: 'mail.alirazanaqvi.com',
//     port: 465,
//     auth: {
//         user: 'contact@alirazanaqvi.com',
//         pass: '=MTt36#iS(G.'
//     }
// });

// const transporter = nodemailer.createTransport({
//     service: "Hotmail",
//     // host: "smtp-mail.hotmail.com",
//     // secureConnection: false,
//     // port: 587,
//     auth: {
//         user: "alinaqvi12145555@hotmail.com",
//         pass: "Aliraza5a5"
//     },
//     // tls: {
//         // ciphers:'SSLv3'
//     // }
// });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  // secure: false, // upgrade later with STARTTLS
  auth: {
    user: "alinaqvi097@gmail.com",
    pass: "PT8R5Sf0U3Q7pxEX",
  },
});

// var transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     auth: {
//       user: 'somerealemail@gmail.com',
//       pass: 'realpasswordforaboveaccount'
//     }
//   }));



app.get('/', async(req,res)=>{
    const message = req.query.m;
    
    let mailist = await fs.readFileSync("./listname.txt", "utf-8");
    let emailist = await mailist.split(/\r?\n/);

    let total = emailist.length;
    let i = 0;
    
    function sendMail(){
        let email = emailist[i];
    
    
        var mailOptions = {
            from: 'riphainternational@gmail.com',
            to: email,
            subject: 'Ripha University Notification Borad system',
            text: message
          };
    
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.send(error)
            } else {
              console.log('Email sent: ' + info.response);
              res.send(info.response)
            }
          });  

          i = i+1;

          if(i<total){
            sendMail()
          }
          else{
            res.send("all emails send successfully")
          }
    }

    sendMail()

})


app.listen(5000,()=>{
    console.log("server started on port:", 5000)
})