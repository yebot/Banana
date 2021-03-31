const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://yebot-codesmith:FQ61XTbtbrGP7Ums@codesmith1.euzn2.mongodb.net/banana?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: 'banana'
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
  oauthProfile: Object
});
const User = mongoose.model('users', userSchema);


module.exports = {
  Note,
  User,
  Session,
};

