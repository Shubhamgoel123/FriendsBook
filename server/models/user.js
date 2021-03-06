var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');



mongoose.connect('mongodb://kachu:kachu@ds117148.mlab.com:17148/friendsbook',function(err,database)
	{
		if(err)
		  return console.log(err);
         return console.log("connected to mongo");
	});

var db1=mongoose.connection;

//User Schema
  var UserSchema=mongoose.Schema({
    username: {
          type: String,
          index:true
    },
    password: {
      type: String
    },
    email: {
      type: String
    },
    name: {
      type: String
    },
    image:
    {
      type: String
    }
  });

var User=module.exports = mongoose.model('User',UserSchema);

module.exports.createUser=function(newUser,callback){
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(newUser.password,salt,function(err,hash){
     newUser.password=hash;
     newUser.save(callback);
    });
    });
  }

  module.exports.getUserByUsername = function(username,callback){
  	var query = {username: username};
  	User.findOne(query,callback);
  }

module.exports.getUserById = function(id,callback){
  	User.findById(id,callback);
  }

  module.exports.comparePassword = function(candidatePassword,hash, callback){
      bcrypt.compare(candidatePassword, hash, function(err,isMatch)
      {
        if(err) throw err;
        callback(null,isMatch);
      });	
  }

  module.exports.updateUser=function(id,user,options,callback)
{
  var query={_id:id};
  var update={
    image: user.image
  }
  User.findOneAndUpdate(query,update,options,callback);
}

