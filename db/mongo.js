var mongoose = require('mongoose');
mongoose.connect('mongodb://team38:cis350@ds147668.mlab.com:47668/club-central', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected. Adding seed data...');
  }
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var userSchema = new mongoose.Schema({
  userid: {type: String, unique: true, required: true},
  email: {type: String, required: true},
  name: {type: String, required: true},
  clubs: [String]
});

var clubSchema = new mongoose.Schema({
  clubid: {type: String, unique: true, required: true},
  adminid: {type: String, required: true}, 
  clubname: {type: String, required: true},
  members: [String],
  welcomeblurb: String
});

var eventSchema = new mongoose.Schema({
  eventid: {type: String, unique: true, required: true},
  date: {type: Number, required: true},
  starttime: {type: Number, required: true},
  endtime: {type: Number, required: true},
  eventname: {type: String, required: true},
  location: {type: String, required: true},
  invited: [String]
})

var User = mongoose.model('User', userSchema);
var Club = mongoose.model('Club', clubSchema);
var ClubEvent = mongoose.model('ClubEvent', eventSchema);

module.exports = {
  User: User,
  Club: Club,
  ClubEvent: ClubEvent,
  mongoose: mongoose,
  db: db.collection('Accounts')
};
