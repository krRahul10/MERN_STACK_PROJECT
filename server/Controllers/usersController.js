const users = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL

// ********* Register API **********

exports.userPost = async (req, res) => {
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

// ***** To GET ALL USERS DETAILS *********

exports.userGet = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  const page= req.query.page || 1
  const ITEM_PER_PAGE = 4


  // console.log(req.query);
  const query = {
    fname: {
      $regex: search,
      $options: "i",
    },
  };
  if (gender !== "All") {
    query.gender = gender;
  }

  if (status !== "All") {
    query.status = status;
  }
  try {

    const skip = (page-1)*ITEM_PER_PAGE // 1-1*4=0  4-1*4=12

    const countData = await users.countDocuments(query);
    // console.log(countData)


    const userData = await users
      .find(query)
      .sort({ dateCreated: sort === "new" ? -1 : 1 })
      .limit(ITEM_PER_PAGE)
      .skip(skip)

      const pageCount = Math.ceil(countData/ITEM_PER_PAGE) // 8/4=2




    res.status(200).json({
      Pagination:{
        countData,pageCount
      },
      userData
    });
  } catch (error) {
    res.status(424).json(error);
  }
};

// ***** To GET SINGLE USER DETAILS *********

exports.singleUserGet = async (req, res) => {
  const { id } = req.params;

  try {
    const userDetails = await users.findOne({ _id: id });

    res.status(200).json(userDetails);
  } catch (error) {
    res.status(424).json(error);
  }
};

// ************* for single user update **********

exports.userEdit = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    mobile,
    gender,
    location,
    status,
    user_profile,
  } = req.body;
  const file = req.file ? req.file.filename : user_profile;
  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    const updateUser = await users.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        location,
        profile: file,
        dateUpdated,
      },
      {
        new: true,
      }
    );

    await updateUser.save();
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// ********* DELETE API FOR SINGLE FRO USER ******

exports.userDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(424).json(error);
  }
};

// ********** single user status change api ********

exports.userStatus = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const userStatusUpdate = await users.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );
    res.status(200).json(userStatusUpdate);
  } catch (error) {
    res.status(401).json(error);
  }
};

// Export User

exports.userExport = async (req, res) => {
  try {
    const usersData = await users.find();

    const csvStream = csv.format({ headers: true });

    if (!fs.existsSync("public/files/export")) {
      if (!fs.existsSync("public/files")) {
        fs.mkdirSync("public/files/");
      }
      if (!fs.existsSync("public/files/export")) {
        fs.mkdirSync("./public/files/export");
      }
    }

    const writablestream = fs.createWriteStream(
      "public/files/export/users.csv"
    );

    csvStream.pipe(writablestream);

    writablestream.on("finish", function () {
      res.status(200).json({
        downloadUrl:`${BASE_URL}/files/export/users.csv`,
      });
    });

    if (usersData.length > 0) {
      usersData.map((user) => {
        csvStream.write({
          FirstName: user.fname ? user.fname : "-",
          LastName: user.lname ? user.lname : "-",
          Email: user.email ? user.email : "-",
          Phone: user.mobile ? user.mobile : "-",
          Gender: user.gender ? user.gender : "-",
          Status: user.status ? user.status : "-",
          Profile: user.profile ? user.profile : "-",
          Location: user.location ? user.location : "-",
          DateCreated: user.dateCreated ? user.dateCreated : "-",
          DateUpdated: user.dateUpdated ? user.dateUpdated : "-",
        });
      });
    }
    csvStream.end();
    writablestream.end();
  } catch (error) {
    res.status(401).json(error);
  }
};
