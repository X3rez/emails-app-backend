const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const cors = require("cors")


app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))


app.get("/send",(req,res)=>{
  res.json({page:"principal"})
})


app.post("/send",(req,res)=>{
    const {message,email,subject} = req.body


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "christhopherdaniel21@gmail.com",
          pass: "yuwvdlfhppkqdbcs",
        },
      })

    let TransporterOptions = {
        from: `"App React 👻" <foo@example.com>`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: message, // html body
      }

    
      transporter.sendMail(TransporterOptions,(error,info)=>{
            if(error){
                console.log("hubo un error")
                res.status(500).send(error.message)
            }else{
                console.log("Enviado correctamente")
                res.send("Enviado correctamente")
            }
      });
})





app.listen(process.env.PORT || 3002,()=>{
    console.log("the server is running")
})

