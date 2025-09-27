const mongoose = require("mongoose");
const Listing = require("../models/listings.js");
const initData = require("./data.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}
main()
  .then(() => {
    console.log("Database Coonnection Successfully Established.");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68d377a6066db98a5b08fe9d",
  }));
  await Listing.insertMany(initData.data);
};

initDB();
