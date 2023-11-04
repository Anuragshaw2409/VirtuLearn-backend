const User = require('../Models/Users');
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const JWT_SECRET = "VirtuLearn-2023";
const JWT = require('jsonwebtoken');

const validation = [
    body('name',"Enter a valid name").isLength({min:2}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a strong password must be 8 characters long").isLength({min:8}),
    body('isTeacher',"required").isBoolean()
];






// ---------------------Creating user--------------------
router.post('/createuser',validation, async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({"errors": errors.array()});

    }

    try {
        let userExist = await User.findOne({"email":req.body.email});
        if(userExist){
            
            return res.status(400).json("User already exists");
        }
        const newUser = await User.create({
            "name": req.body.name,
            "email":req.body.email,
            "password":req.body.password,
            "isTeacher": req.body.isTeacher
        })
        const data = newUser.id;
        let authToken = JWT.sign(data, JWT_SECRET);
        return res.status(201).json({"UserCreated": true, "authToken":authToken});


        
    } catch (error) {
        return res.status(201).json({"UserCreated": false});
    }
    
});


// --------------------------login--------------------

router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a strong password must be 8 characters long").isLength({min:8})
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({"errors": errors.array()});

    }

    try {
        let userExist = await User.findOne({"email":req.body.email});
        if(!userExist){
            return res.status(400).json("Invalid credentials");
        }
        if(userExist.password !==req.body.password){
            return res.status(401).json("Invalid credentials");

        }
        const data = await userExist.id;
        console.log(data);
        console.log(userExist.isTeacher);
        let authToken = JWT.sign(data,JWT_SECRET);
        return res.status(201).json({"Loggedin": "true","authToken": authToken,"isTeacher":userExist.isTeacher});
       
        
    } catch (error) {
        res.status(500).json("Internal server error");
    }
    
});

// /---------------------------fetching students--------------------

router.get('/fetchstudents', async (req, res) => {

    try {
        const students = await User.find({ isTeacher: false });
        res.status(200).json(students);


    } catch (error) {
        res.status(500).json({ "Error": "Internal server error from catch" })
    }

})
















module.exports = router;