//require the libarary
const mongoose = require('mongoose');
const env = require('../config/enviroment');

//connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

//aquire the connection (to check it is sucessfull)
const db = mongoose.connection;

//error handling

db.on('error' , console.error.bind(console , 'Error connecting to db'));

//up and running then print the message

db.once('open' , function(){
    console.log('Connected to database :: MongoDb');
});

module.exports = db;