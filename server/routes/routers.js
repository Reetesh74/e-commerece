const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const secretKey = process.env.KEY;
const authenticate = require("../middleware/authenticate");

// get product data api
router.get("/getproducts", async (req, res) => {
  try {
    const productdata = await products.find();
    // console.log("new data"+productdata);

    res.status(201).json(productdata); // to send the data to the frontent
  } catch (error) {
    console.log("error" + error.message);
  }
});

// get individual data clint app.js
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);

    const individual = await products.findOne({ id });
    // console.log(individual + "ind mila hai");

    res.status(201).json(individual);
  } catch (error) {
    // res.status(400).send(individual);
    console.log("error" + error.message);
  }
});

// register data
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "filll the all details" });
  }

  try {
    const preuser = await User.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "this user is already present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword are not match" });
    } else {
      const finalUser = new User({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // bycryptjs
      // password hasing process
      // password hasing process

      const storedata = await finalUser.save();
      // console.log(storedata);
      res.status(201).json(storedata);
    }
  } catch (error) {}
});

// for user login qpi
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the all data" });
  }

  try {
    const userlogin = await User.findOne({ email: email });
    // console.log(userlogin);

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      // console.log(isMatch);
      // token genrate

      const token = await userlogin.generatAuthtoken();
      // console.log(token);

      // cookies
      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalis details" });
      } else {
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "invalis details" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalis detail" });
  }
});





module.exports = router;
