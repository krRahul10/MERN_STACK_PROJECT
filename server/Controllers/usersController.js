const users = require("../models/usersSchema");
const moment = require("moment");

// ********* Register API **********

exports.userpost = async (req, res) => {
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, location, status } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !location ||
    !status ||
    !file
  ) {
    res.status(401).json("Please Fill Your All Details");
  }

  try {
    const preUser = await users.findOne({ email: email });

    if (preUser) {
      res.status(401).json("This User Is Already Exist");
    } else {
      const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const userData = new users({
        fname,
        lname,
        email,
        mobile,
        location,
        gender,
        status,
        profile: file,
        dateCreated,
      });

      await userData.save();
      res.status(201).json(userData);
    }
  } catch (error) {
    res.status(424).json({ error });
  }
};

exports.userGet = async (req,res) => {
  try {
    const userData = await users.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(424).json(error);
  }
};
