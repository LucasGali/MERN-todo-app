const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

module.exports = async () => {
  try {
    await mongoose.connect(uri);

    console.log('MongoDB connected');
  } catch (error) {
    console.log('error in connection ',error);
  }
}