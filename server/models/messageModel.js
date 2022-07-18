const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
    fullName: {     
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {     
      type: Number,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    // attachment: [
    //   { file: { 
    //       type: Buffer, 
    //       contentType: String, 
    //     },
    //     filename: { 
    //       type: String,
    //     }
    //   },
    // ],
    message: {    
      type: String,
      required: true,
      trim: true,
    },
  }, { timestamps: true }
);

module.exports = model("Message", messageSchema);
