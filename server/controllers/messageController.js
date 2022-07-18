const nodemailer = require("nodemailer");
var fs = require("fs");
const messageModel = require("../models/messageModel.js");

const { isValid,
        isValidRequestBody,
        isValidName,
        isValidNumber,
        isValidEmail,
        isSingleAttachment,
      } = require("../middlewares/validations.js");


// --------------------------------- Connection or Setup ---------------------------------------
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
            user: 'ankitgupta@gmail.com',
            pass: 'password',
    },
  secure: true,
});


// ---------------------------------- Create Contact Form ---------------------------------------

const createform = async (req, res) => {
  try {
    if (!isValidRequestBody(req.body))
      return res.status(400).json({ status: false, msg: "Please provide the card details" });

    let { fullName, email, phone, subject, message } = req.body;

    if (!isValid(fullName))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Full Name" });

    if (!isValidName(fullName))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Valid Name without any specail charsacter or numbers." });

    if (!isValid(email))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Email Address" });

    if (!isValidEmail(email))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the valid Email Address" });

    let isEmailExist = await messageModel.findOne({ email });
    if (isEmailExist)
      return res
        .status(400)
        .json({ status: false, msg: "Your Form is already Registered." });

    if (!isValid(phone))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Phone Number" });

    if (!isValidNumber(phone))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the valid Phone Number." });

    if (!isValid(subject))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Subject" });

    if (!isValid(message))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Message" });

    // mail data
    const mailData = {
        from: 'ankitgupta@gmail.com',  // sender address
        to: 'hiring@digitalcorsel.com',   // list of receivers   
        cc:  'email',
        subject: subject,
        text: message,
        html: 'Mail sent successfully',
    };

    // sending mail using nodemailer
    transporter.sendMail(mailData, function (err, info) {
      if(err) {
        console.log(err)
        return res.status(400).send({ 
          status: false, 
          message: "Contact Form isn't registered, Try Again.", 
          });
      }
      console.log(info);
      return res.status(201).send({
        type: "success", 
        status: true, 
        message: "Contact Form is registered successfully", 
        // data: formData
        message_id: info.messageId, 
        });
   });
  
  const createForm = {
    fullName, 
    email, 
    phone,
    subject, 
    message 
  };

  await messageModel.create(createForm);

  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
};


// ------------------------------- Create Contact Form with Attachment ------------------------------

const formWithAttachment = async (req, res) => {
  try {

    if (!isValidRequestBody(req.body))
      return res.status(400).json({ status: false, msg: "Please provide the card details" });

    let { fullName, email, phone, subject, message, attachments } = req.body;

    if (!isValid(fullName))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Full Name" });

    if (!isValidName(fullName))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Valid Name without any specail charsacter or numbers." });

    if (!isValid(email))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Email Address" });

    if (!isValidEmail(email))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the valid Email Address" });

    let isEmailExist = await messageModel.findOne({ email });
    if (isEmailExist)
      return res
        .status(400)
        .json({ status: false, msg: "Your Form is already Registered." });

    if (!isValid(phone))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Phone Number" });

    if (!isValidNumber(phone))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the valid Phone Number." });

    if (!isValid(subject))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Subject" });

    if (!isValid(message))
      return res
        .status(400)
        .json({ status: false, msg: "Please provide the Message" });

    if (!isValid(attachments))
      return res
        .status(400)
        .json({ status: false, msg: "Please upload the Attachment that size is smaller than 16MB." });
    
    if (!isSingleAttachment(attachments))
      return res
        .status(400)
        .json({ status: false, msg: "Please upload the single Attachment only that size is smaller than 16MB." });

    // File upload in Database
    const file = new Item();  
    file.any.data = fs.readFileSync(attachments);
    file.any.contentType = 'anyFile/png';

    // mail data
    const mailData = {
      from: 'email',  // sender address
      to: 'ankitgupta9828@gmail.com',   // list of receivers   hiring@digitalcorsel.com
      // cc:  'agupta9009@gmail.com',
      subject: subject,
      text: message,
      html: 'Mail sent successfully',
      attachments: [
        {   // Image file on disk as an attachment
            filename: 'nodemailer.png',
            path: 'nodemailer.png'
        },
        {   // Text file on disk as an attachment
            filename: 'text_file.txt',
            path: 'text_file.txt'
        }
      ],
    };

    // sending mail using nodemailer
    transporter.sendMail(mailData, function (err, info) {
      if(err) {
        console.log(err)
        return res.status(400).send({ 
          status: false, 
          message: "Contact Form isn't registered, Try Again.", 
          });
      }
      console.log(info);
      return res.status(201).send({
        type: "success", 
        status: true, 
        message: "Contact Form is registered successfully", 
        // data: formData
        message_id: info.messageId, 
        });
   });
  const createForm = {
    fullName, 
    email, 
    phone,
    subject, 
    message,
  };

    await messageModel.create(createForm);

  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
};


module.exports = { createform, formWithAttachment }