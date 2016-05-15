db.dropDatabase();

//-----Users-----

var andrea = {
 name: "Andrea",
 email: "andrea@gmail.com",
 password: "password"
};

db.users.save(andrea, function(err){
 if(err) {
   return handleError(err);
 } else {
   console.log("Andrea you are in the database");
 }
});

var dami = {
 name: "Damimister",
 email: "dami@gmail.com",
 password: "password"
};
db.users.save(dami);

var sam = {
 name: "Sam the Man",
 email: "sam@gmail.com",
 password: "password"
};
db.users.save(sam);