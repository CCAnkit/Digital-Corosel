const express = require("express");

const router = express.Router();

const { createform, formWithAttachment } = require("../controllers/messageController.js");


// Contact Form API's
router.post('/form', createform);

router.post('/form-attachment', formWithAttachment);


module.exports = router;