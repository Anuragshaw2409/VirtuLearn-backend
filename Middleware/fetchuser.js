const JWT = require('jsonwebtoken');
const JWT_SECRET = "VirtuLearn-2023";


const fetchuser = async(req,res,next)=>{

    const authToken = req.header('authToken');
    console.log(authToken);
    if(!authToken)
    {return res.status(400).json({"error":"Please provide auth Token"});
    
}
try {
    
    const userId = JWT.verify(authToken, JWT_SECRET) ;
    req.user= userId;
    next();
} catch (error) {
    return res.status(500).json(error);
    
}
    // console.log(userId);

}

module.exports = fetchuser;