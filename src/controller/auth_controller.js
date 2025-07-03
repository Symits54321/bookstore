const fs = require("fs").promises;
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_bookstore_secret_key'; // should be long and secure
const JWT_EXPIRY_TIME = '4h';
const userDbPath = path.join(__dirname, "../data/user.json");


// Register function
module.exports.register = async (req, res) => {
  try {
    // req data exolore
    const {email, password} = req.body;
  
    // validate user email
    if(!email  || typeof email !== "string" || email == ""){
      return res.status(500).json({
        message:"Invalid Email"
      });
    }
    
    // validate user password
    if(!password  || typeof password !== "string" || password == ""){
      return res.status(500).json({
        message:"Invalid Password"
      });
    }

    // creating new user data
    const newUserData = {
      id: uuidv4(),
      email: email,
      password: await bcrypt.hash(password,10),
    }

    // fetching user_data from local db
    const userDataStringified = await fs.readFile(userDbPath,'utf-8');
    const userData = JSON.parse(userDataStringified);

    // pushing in userdata
    userData.push(newUserData);

    // adding the updated userdata json in local db
    await fs.writeFile(userDbPath,JSON.stringify(userData));
    
    // finally returning success response
    return res.status(200).json({
        message:"user added successfully"
    });
  
  } catch (error) {
    console.log("Error in register controller : " + error);
      return res.status(500).json({
        message:"Error in register controller"
    });
  }
};

// Register function
module.exports.login = async (req, res) => {
  try {
        // req data explore
        const {email, password } = req.body;

        // fetching user_data from local db
        const userDataStringified = await fs.readFile(userDbPath,'utf-8');
        const userData = JSON.parse(userDataStringified);
        
        const authHeader = req.headers.authorization;

        // if token provided in bearer
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            const isUserPresent = userData.find(user => user.email === decoded.email);
            if (!isUserPresent) {
              return res.status(400).json({ message: 'Invalid Bearer Token' });
            }
            return res.status(200).json({
              message: 'Already logged in',
              user: { id: decoded.id, email: decoded.email },
              token,
            }); 
        }

        // validate user email
        if(!email  || typeof email !== "string" || email == ""){
          return res.status(500).json({
            message:"Invalid Email"
          });
        }
        
        // validate user password
        if(!password  || typeof password !== "string" || password == ""){
          return res.status(500).json({
            message:"Invalid Password"
          });
        }

        // find User email is present or not
        const isUserPresent = userData.find(user => user.email === email);

        // if no email matches then return
        if (!isUserPresent) {
          return res.status(400).json({ message: 'Not Registered' });
        }

        // isVerified Password
        const match = await bcrypt.compare(password, isUserPresent.password);
        if(!match){
          return res.status(400).json({ message: 'Wrong Password' });
        }

        // generating token
        const newToken = jwt.sign( 
          {id: isUserPresent.id, email: isUserPresent.email},
            JWT_SECRET, 
          { expiresIn: JWT_EXPIRY_TIME }
        );
      
        // finally returning success response
        return res.status(200).json({
            message: 'Login successful',
            token:newToken,
            user: { id: isUserPresent.id, email: isUserPresent.email }
        });
  
  } catch (error) {
      console.log("Error in login : " + error);
      return res.status(500).json({
        message:"Error in login"
      });
  }
};


