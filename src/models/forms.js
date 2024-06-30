const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

//////////////////////////

const formSchema = new mongoose.Schema(
  {
    description: {
      required: true,
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//////////////////////////

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
