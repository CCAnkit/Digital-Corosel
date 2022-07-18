const mongoose = require("mongoose");


// --------------------------------- Validation for Checking Values ---------------------------------------
function isValid(value) {
    
    if (typeof value === "undefined" || typeof value === null) return false;

    if (typeof value === "string" && value.trim().length === 0) return false;
    
    return true;
}


// --------------------------------- Validation for RequestBody ---------------------------------------
function isValidRequestBody(requestBody) {

    return Object.keys(requestBody).length !== 0;
}


// --------------------------------- Validation for Name ---------------------------------------
function isValidName(s) {

    if (s.length == 0) return false;
    
    if (s.length > 30) return false;

    var letters = /^[A-Za-z ]+$/;
    
    for (let i = 0; i < s.length; i++) {
      if (!s[i].match(letters)) return false;
    }
    return true;
}


// --------------------------------- Validation for Email ---------------------------------------
function isValidEmail(email) {
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return false;
    
    return true;
}


// --------------------------------- Validation for Phone ---------------------------------------
function isValidNumber(phone) {
    
    if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone))
      return false;
    
    return true;
}

// --------------------------------- Validation for Phone ---------------------------------------
function isSingleAttachment(attachments) {
    
    if (attachments.length == 1)
      return true;
    
    return false;
}



module.exports = {
    isValid,
    isValidRequestBody,
    isValidName,
    isValidNumber,
    isValidEmail,
    isSingleAttachment,
};