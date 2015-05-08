Derek Costigan ws04
=========================

How to run code
------------------
To run the code simply run the ./bin/www file inside of sessions in the ws04 folder. Then open up a browser and go to localhost:3000. From there you can log in and depending on the user go to different routes. Regular users can only go to preworkshop routes, while admins can now go to an /users/admin route. This route shows the current logged in admin as well as a form to create new users, both admin and non-admin. Users will not be duplicated and the page will rerout to the admin page after a new user has been submitted. The default admin username and password is: "admin" "password".

app.js
------------------
The only thing changed in this file is the new require statement for the admin route. Then the app.use statement for that same route.  

admin.ejs
------------------
Template for the new admin page. Contains two titles, bulleted list for the current active user, and a form to create new users.

online.ejs
------------------
Edited to only display non-admin users.

user.js
------------------
Added admin definition on to the user object. It now contains binary for whether or not the user is an admin. Created a new property called admin that can be called to check whether or not the object is an admin. Also created a function called createUser to push a new user onto the userdb array.

admin.js
-----------------
This file has a get and post for the admin page. The get sets up the page and makes sure non-admins can't view it. Also if you are not logged in it will rout you back to the login page. The post checks for when the submit button is pressed and once it is checks to see if the value in the form are already a user. If they are it will flash a message to the admin page, if not it will create that new user, whether it be an admin or non-admin. 