var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

var online = {};

//set up the admin route page and redirect if invalid credentials
router.get('/admin', function(req, res){
  var user = req.session.user;
  var authmessage = req.flash('admin/newuser') || '';

    if(user === undefined){
      res.redirect('/user/login');
    }
    online[user.uid] = user;
    if(user === undefined && online[user.uid] === undefined){
      res.redirect('/user/login');
    }
    if (user !== undefined && online[user.uid] !== undefined && user.admin !== 1) {
      res.redirect('/user/login');
    }
    res.render('admin', { title : 'Admin Users Online',
                          title2 : 'Create New User',
                          message: authmessage,
                          users  : online });
});



//preform operations after submit on admin page has been pressed
router.post('/admin/newuser', function(req, res){
  var user = req.session.user;  
  var username = req.body.username;
  var password = req.body.password;
  var admin;
  if(req.body.admin === '1'){
    admin = 1;
  }
  else{
    admin = 0;
  }
  userlib.lookup(username, password, function(error, user){
    if(error){
      userlib.createUser(username, password, admin);
    }
    else{
      req.flash('admin/newuser', 'User Already Exists!');
    }
  });
  res.redirect('/user/admin');

});

module.exports = router;