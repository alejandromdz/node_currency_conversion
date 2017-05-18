var mongoose=require('mongoose');
var User = require("./build/models/user").default;
var dbUrl = 'mongodb://localhost/currency_app';
mongoose.connect(dbUrl);
var user=new User({username:'user',password:'12345'});
User.find({username:'user'}).remove().exec();
user.save()
.then(function(res){console.log('defaul{username:"username",password:"12345"}')})
.catch(function(err){console.log(err)})