// const { default: mongoose } = require ("mongoose");
// // const mongoose = require ("mongoose");

// // const mongourl = "mongodb://localhost:27017/hotels"
// const mongourl = 'mongodb+srv://nomi63558:Nouman2880@cluster0.98dlp.mongodb.net/'


// mongoose.connect(mongourl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// const db = mongoose.connection;

// db.on('connected', ()=> {
//   console.log("connected to mongodb server")
// })
// db.on('error', (err)=> {
//   console.log("mongodb server error",err)
// })
// db.on('disconnected', ()=> {
//   console.log("mongodb disconnected")
// })


// module.exports = db;







// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const mongoose = require("mongoose");
const mongourl = process.env.MONGODB_URL;
// const mongourl = process.env.MONGODB_URL_LOCAL;


mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);  // Clearer error message
});
const db = mongoose.connection;

db.on('error', (err) => {
  console.error("MongoDB error:", err);  // Improve the error message
});

db.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
