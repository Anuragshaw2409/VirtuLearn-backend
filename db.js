const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/VirtuLearn?tls=false";

const ConnextToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("Connected to mongo")

    })
    .catch((err)=>{console.log("error occured",err)})
}

module.exports = ConnextToMongo;