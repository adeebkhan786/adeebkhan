const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
// var mongoose=require('mongoose');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
// mongoose.connect('mongodb://localhost/adeebKhan',{useNewUrlParser:true})
const port=8000;

// Define mongoose schema
// var adeebKhanSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     phone:String,
//     subject:String,
//     address:String,
//     message:String
// })


// var adeebKhan=mongoose.model('adeebKhan',adeebKhanSchema)

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));  // for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug');  // set the template engine as pug
app.set('views',path.join(__dirname,'views'));    //set the views directory


// ENDPOINTS
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('index.pug',params);
})

// app.post('/',(req,res)=>{
//     var myData= new adeebKhan(req.body);
//     myData.save().then(()=>{
//         res.send("Your record has been saved to the database.")
//     }).catch(()=>{
//         res.status(400).send("Your record was not saved to the databse.")
//     });
    // res.status(200).render('index.pug');
// })

app.post('/',(req,res)=>{
    const na=req.body.name;
    // const ema=req.body.email;
    const ph=req.body.phone;
    const subj=req.body.subject;
    const add=req.body.address;
    const msg=req.body.message;
    console.log(req.body);

var transpoter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'adeebkhan4786@gmail.com',
        pass:'vuuyzyznllzwnxjt'    //fake password for demo
    }
})
// var mailOptions={
//     from:'adeebkhan4786@gmail.com',
//     to:req.body.email,
//     cc:'adeebkhan4786@gmail.com',
//     subject:'Thank For Giving Feedback ' + na,
//     text:'Thanks For Your Message You Have Sent To Us ---->' + msg
// }
var mailOptions={
    from:`${req.body.email}`,
    to:'adeebkhan4786@gmail.com',
    // cc:'adeebkhan4786@gmail.com',
    subject:'New Contact Form Enquiery ' + na,
//     text:'Thanks For Your Message You Have Sent To Us ---->' + "\n" + 'My name is: ' + na + "\n" +"My email is: " + ema+ "\n" + "My Phone Number is: " + ph + "\n" + "My subject is: "+ subj + "\n" + "My address is: "+ add +"\n" + "My messege is: " + msg
    text:`Messege from ${na},
Email: ${req.body.email},
Phone Number: ${ph},
Subject: ${subj},
Address: ${add},
Message: ${msg}
    `
}

transpoter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }else{
        // res.send("Mail Submitted");
        res.redirect('/');
        console.log("Email sent" + info.response);
    }
})

})



// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})
