const db = require("../config/connection");
const bcrypt = require("bcrypt");
const pool = db;
require("dotenv").config();
// const jwt = require("jsonwebtoken");


exports.add = async (request, response) => {
    let picture =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  // get data from the request
  let { firstname, lastname, email, contactno,password ,user_type} = request.body;
 

  let uType = user_type;
  console.log(user_type)
  console.log(firstname)
 
  // adding user attempt section
  try {

    // check if the user exist
    let verify = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    let data = verify.rows;
    if (data.length != 0) {
      return response.status(400).json({ error: "email already registered" })
    } else {
      // hashing password
      let hashedPassword = await bcrypt.genSalt(10);

      // setting password to hashed password
      password = await bcrypt.hash(request.body.password, hashedPassword);

      // add new user
      pool.query(`INSERT INTO users (email,firstname, lastname,  contactno, password, user_type,picture) 
                  VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING user_id;`,
        [email,firstname, lastname,  contactno, password, user_type,picture],
        (error, result) => {
          // if error, log it
          if (error) {
            response.status(400).json({ error: "error while registering a user" })
            throw error
          }
          else {

          

            if (uType === 1) {
                let seller_id = result.rows[0].user_id;
             console.log( seller_id)
              
              pool.query(`INSERT INTO seller (seller_id) 
              VALUES($1) RETURNING *;`,
              [seller_id],
              (error, result) => {

                if(error){
                  
                }else{
                  response.status(200).json({ message: "user info successfully added as seller"});
                }


              })

             
            }
          
            if (uType === 2) {

              response.status(200).json({ message: "user info successfully added a client"});
            }


          }
        });

    }
  } catch (error) {
    console.log(error);
    
  }
};


