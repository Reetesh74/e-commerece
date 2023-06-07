const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretkey = process.env.KEY;

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email address");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.password, 10);
  }
  next();
});

// token genrate
userSchema.methods.generatAuthtoken = async function(){
  try {
      let token = jwt.sign({ _id:this._id},secretkey,{
          expiresIn:"1d"
      });
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;

  } catch (error) {
      console.log(error);
  }
}



const user = new mongoose.model("user", userSchema);

module.exports = user;
