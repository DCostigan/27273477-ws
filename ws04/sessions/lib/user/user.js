// # User Library

// ## User Objects
function User(username, password, uid, admin) {
  this.username = username;
  this.password = password;
  // Added uid
  this.uid      = uid;
  //Added admin
  this.admin    = admin;

}

// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 1, 0),
  new User('hazel', 'lezah', 2, 0),
  new User('caleb', 'belac', 3, 0),
  //new admin user for testing
  new User('admin', 'password', 4, 1)
];

//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};
//creates a new user and puts it to the end of usersdb array
exports.createUser = function(username, password, admin){
  var len = userdb.length;
  var uid = len + 1;
  var user = new User(username, password, uid, admin);
  userdb.push(user);
};