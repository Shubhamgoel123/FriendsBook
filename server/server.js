const express= require('express')
const app=express()
var bodyParser= require('body-parser')
var session=require('express-session')
var expressValidator=require('express-validator')
var passport=require('passport')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.set('port',5000)
var MongoClient = require('mongodb').MongoClient;


//routes
//var routes=require('./routes/index');
var users=require('./routes/users');

var db;
MongoClient.connect('mongodb://kachu:kachu@ds117148.mlab.com:17148/friendsbook',function(err,database)
  {
    if(err)
      return console.log(err);
      db=database;
    return console.log("connected to mongo1");
  })

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validotors
app.use(expressValidator({
  errorFormatter: function(param,msg,value){
    var namespace= param.split('.')
    , root=namespace.shift()
    , formParam=root;
   
   while(namespace.length) {
    formParam+= '['+namespace.shift() + ']';
   }
   return{
    param : formParam,
    msg : msg,
    value : value
   };
  }
}));


//app.use('/',routes);
app.use('/users',users);

app.get('/', (req, res) => {
      
      res.send("hlo");  
    })


app.listen(app.get('port'),function()
{
console.log("Api running on port",app.get('port'))	
})

