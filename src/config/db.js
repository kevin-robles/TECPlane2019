const mongoose = require('mongoose');
const dbURL = require('./props').DB;

module.exports = ()=>{
    mongoose.connect(dbURL, {useNewUrlParser: true})
    .then(()=> console.log(`Mongo connected on ${dbURL}`))
    .catch(err => console.log(`Mongo connected on ${err}`))

    process.on('SINGIT', ()=>{
        mongoose.connection.close(()=>{
            console.log('Mongo is disconnected');
            process.exit(0);
        });
    });
}