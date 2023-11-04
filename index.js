const ConnectToMongo = require('./db');
ConnectToMongo();
const cors = require('cors');

const express = require('express');
const app = express();
const port = 5000;
app.listen(port,()=>{
    console.log("App listening on",port);

})
app.get('/',(req,res)=>{
    res.json("This is home");
})
app.use(cors())

app.use(express.json());
app.use('/api/auth',require('./Routes/Auth'));
app.use('/api/course',require('./Routes/Course'));

