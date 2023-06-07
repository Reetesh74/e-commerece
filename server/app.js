require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Products=require('./models/productsSchema')
const DefaultData=require("./defaultdata")
const cors=require("cors");
const router=require("./routes/routers")
const cookieParser=require("cookie-parser");



app.use(express.json());
app.use(cookieParser(""));
app.use(cors());

app.use(router)


const port = 8005;
mongoose.set("strictQuery", false);

mongoose
  .connect(
    process.env.MONGOURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((data) => {
    console.log(`MongoDB connected with serveres: ${data.connection.host}`);
  });

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
DefaultData();
