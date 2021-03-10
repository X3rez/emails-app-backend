const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const cors = require("cors")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/send",(req,res)=>{
  res.json({page:"principal"})
})


app.post("/send",(req,res)=>{
    const {name,email,subject,message} = req.body

    const MessageResived = `<p>
                               Name:${name}
                               Email:${email}                          
                               Subject:${subject}                          
                               Message:${message}   
                            <p>`


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
        from: `"My portfolio 👻" <foo@example.com>`,
        to: "cristhopherdan@gmail.com",
        subject: subject,
        html:MessageResived, 
      }

    
      transporter.sendMail(TransporterOptions,(error,info)=>{
            if(error){
                console.log("hubo un error")
                res.send(error)
            }else{
                console.log("Enviado correctamente")
                res.redirect("http://localhost:5500/")
            }
      });
})





app.listen(process.env.PORT || 3002,()=>{
    console.log("the server is running")
})

