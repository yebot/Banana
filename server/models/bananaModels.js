//const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: process.env.DB_NAME
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

/* 
  TODO: Schema for users
  TODO: Schema for sessions
*/



/* NOTES */

const noteSchema = new Schema({
  author_id: { type: String, required: true }, // Schema.Types.ObjectId
  title: String,
  tags: String,
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});
noteSchema.pre('findOneAndUpdate', function preSave(next) {
  this._update.modified_at = Date.now();
  next();
});
const Note = mongoose.model('notes', noteSchema);




/* SESSIONS */
const sessionSchema = new Schema({
  //cookieId: { type: String, required: true },
});
const Session = mongoose.model('sessions', sessionSchema);




/* USERS */
const userSchema = new Schema({
  //email: { type: String },
  githubAccessToken: String,
  githubId: { type: String, required: true, unique: true, },
  oauthProfile: Object,
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});
userSchema.pre('findOneAndUpdate', function preSave(next) {
  this._update.modified_at = Date.now();
  next();
});

const User = mongoose.model('users', userSchema);


module.exports = {
  Note,
  User,
  Session,
};

