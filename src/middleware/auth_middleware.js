const fs = require("fs").promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_bookstore_secret_key'; 
const JWT_EXPIRY_TIME = '1h';
const userDbPath = path.join(__dirname, "../data/user.json");


module.exports.verifyAuthenticated = async (req, res, next) => {
    try{ 
         // fetching user_data from local db
        const userDataStringified = await fs.readFile(userDbPath,'utf-8');
        const userData = JSON.parse(userDataStringified);

        // fetching auth header
        const authHeader = req.headers.authorization;

        // if bearer token is provided 
        if (authHeader && authHeader.startsWith('Bearer ')) {

            // make array with split and get token 
            const token = authHeader.split(' ')[1];

            // decode the token
            const decoded = jwt.verify(token, JWT_SECRET);

            // match user email
            const isUserPresent = userData.find(user => user.email === decoded.email);

            // if valid user 
            if(isUserPresent) {
               if(req.body){
                 req.body.userId = isUserPresent.id;
               }
               return next();
            }  
            
            return res.status(500).json({
              message: 'Not Authenticated, Please login ',          
            }); 
            
        }else{
            return res.status(500).json({
              message: 'Please use bearer token correctly',          
            }); 
        }
    } catch (error) {
        console.log("Error in authentication middleware : " + error);
        return res.status(500).json({
           message:"Error in authentication middleware"
        });
    }   
}