const newuserModel = require("../models/newUser");
const newTokenModel = require("../models/token");
const otpModel = require("../models/otp");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const { status } = require("express/lib/response");

exports.postFunc = (request, response) => {
  const newuser = new newuserModel(request.body);

  try {
    newuser.save();
    response.status(200).send(newuser);
  } catch (error) {
    response.status(500).send(error);
  }
};

exports.getFunc = async (request, response) => {
  const newuser = await newuserModel.find({});
  console.log(newuserModel.find({}));
  console.log("a");
  console.log(newuser);
  try {
    response.status(200).send(newuser);
    console.log(newuser);

    console.log("a");
  } catch (error) {
    response.status(500).send(error);
  }
};

exports.getIdFunc = async (request, response) => {
  const _id = request.params.id;
  const newuser = await newuserModel.findById(_id);

  try {
    response.status(200).send(newuser);
    console.log(newuser);
  } catch (error) {
    response.status(500).send(error);
  }
};

exports.putFunc = async (request, response) => {
  const update = request.body;
  const newuser = await newuserModel.updateOne(
    { _id: new ObjectId(request.params.id) },
    { $set: update }
  );
  try {
    response.status(200).send(newuser);
  } catch (error) {
    response.status(500).send(error);
  }
  //response.send({result:"update"})
};

exports.deleteFunc = async (request, response) => {
  const newuser = await newuserModel.deleteOne({
    _id: new ObjectId(request.params.id),
  });
  try {
    response.status(200).send(newuser);
  } catch (error) {
    response.status(500).send(error);
  }
};

exports.addFunc = async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  try {
    const user = await newuserModel.findOne({ email });
    console.log(user);
    if (!user) {
      response.status(422).json({ msg: "username or password is invalid" });
    }
    if (user.password == password) {
      const token = jwt.sign(
        { id: user._id },
        "wproi3gtuqcubyr4n9y8x2438nyuyc3iuehrvg",
        {
          expiresIn: 86400,
        }
      );
      const get_token = new newTokenModel({ token });
      await get_token.save();
      return response.status(200).json({
        email: user.email,
        name: user.name,
        id: user._id,
        role: user.role,
        token,
      });
    } else {
      response.status(422).json({ msg: "username or password is invalid" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

exports.emailFunc = async (request, response) => {
  console.log(request.body.email);
  let data = await newuserModel.findOne({ email: request.body.email });
  console.log(data);
  const responseType = {};
  if (data) {
    let otpCode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new otpModel({
      email: request.body.email,
      code: otpCode,
      expiresIn: new Date().getTime() + 120 * 1000,
    });
    let otpResponse = await otpData.save();
    responseType.statusText = "Success";
    //mailer(349832, mdhingra@bebotechnologies.com )
    responseType.message = "Please check your email";
  } else {
    responseType.statusText = "Failure";
    responseType.message = "Invalid email";
  }
  response.status(200).send({ status: 200, responseType });
  //response.status(200).json(responseType);
};

// exports.passwordFunc = async (request, response) => {
//   response.status(200).json("okk");
// };

const mailer = (email, otp) => {
  var nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    host: "smtp@gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dhingramansi01@gmail.com",
      pass: "userpass",
    },
  });

  let mailOptions = {
    from: "dhingramansi01@gmail.com",
    to: "dhingramansi832gmail.com",
    subject: "Hello ",
    text: "Hello world ?",
    html: "<b>Hello world ?</b>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
};
