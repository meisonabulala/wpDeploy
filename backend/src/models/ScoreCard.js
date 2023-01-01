// define mongoose schema here

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
  id: Number,
  name: String,
  subject: String,
  score: Number
});

const User = mongoose.model("User", user);

export default User;