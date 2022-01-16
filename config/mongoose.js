const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogoverflowdb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to Database'));

db.once('open', function(){
    console.log('Successfully connected to db: MONGODB');
});