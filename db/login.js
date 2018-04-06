var mongo = require('./mongo');

module.exports = {

  getUserOrAdd: function (id, callback) {
    return mongo.User.find({userid: id}).exec(function (error, users) {
      callback(error, users);
    });
  },

  addUser: function (userData, callback) {
    console.log('got to add user function!');
    var user = new mongo.User(userData);
    console.log(userData);
    console.log('created user doc');
    user.save(function (error) {
      if(error) {
        callback(error);
      }
      console.log('got to save function');
      //callback(error);
    });
  },

  addAdminClub: function(id, adminClub, callback) {
    mongo.User.find({userid: id}, function(err, users){
      if (err) console.log(err);

      var newAdminClubs = users[0].adminClubs;
      newAdminClubs.push(adminClub);
      console.log("new Admin clubs:");
      console.log(newAdminClubs);

      mongo.User.update({userid: id}, {$set: {adminClubs: newAdminClubs}}, callback);

    });
  },

  addClub: function(id, club, callback) {
    console.log('Adding club to the user doc!');
    mongo.User.find({userid: id}, function(err, users){
      if (err) console.log(err);

      var newClubs = users[0].clubs;
      if(! newClubs.includes(clubs)) {
        newClubs.push(club);
        console.log("new Clubs:");
        console.log(newClubs);

        mongo.User.update({userid: id}, {$set: {clubs: newClubs}}, callback);
      }

    });
  }
};