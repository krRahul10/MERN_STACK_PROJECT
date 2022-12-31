const mongoose = require("mongoose");
const validator = required("validator");

const usersSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.email(value)) {
        throw Error("Not Valid Email");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique:true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateCreated: Date,
  dateUpdated: Date,
});

//model

const users = new mongoose.model("user", usersSchema);

module.exports = users;