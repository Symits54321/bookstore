const fs = require("fs").promises;
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const path = require('path');
const userDbPath = path.join(__dirname, "../data/user.json");

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
