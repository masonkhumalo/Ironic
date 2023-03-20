const bcrypt = require("bcrypt");

const client = require("../config/connection");

const jwt = require("jsonwebtoken");
const pool = require("../config/connection");

//==========> login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const SECRET_KEY = "iaujshfklausfokjvuorjvksuirefkjauirjkauerfvkajbsrufoajckrabuv";

    try {
        // console.log(email);
        const data = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]) //Verifying if the user exists in the database
        const user = data.rows;



        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            });
        }
        else {


            bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) { //Checking if credentials match
                    const token = jwt.sign({

                        email: user[0].email,
                        password: user[0].password,
                        user_type:user[0].user_type,
                        user_id:user[0].user_id,
                        firstname:user[0].firstname,
                        lastname:user[0].lastname,
                        contactno:user[0].contactno,
                        seller_id:user[0].seller_id


                    },
                        SECRET_KEY
                    );
                    res.status(200).json({
                        message: "User signed in!",
                        token: token,


                    });

                }

                else {
                    //Declaring the errors
                    if (result != true)
                        res.status(400).json({
                            error: "Enter correct password!",
                        });
                }
            })


            
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database Error occurred while signing in!", //Database connection error
        });
    };
};

//==========> GET ALL USERS
exports.getAllUsers = (req, res) => {
  pool.query(`SELECT * FROM users`, (error, results) => {
    if (error) {
      // throw error
      console.log(error);
    }

    res.status(200).json(results.rows);
  });
};


//==========> GET USER BY ID
exports.getUserById = (req, res) => {
  const id = req.params.id;

  pool.query(
    `SELECT user_id, email,firstname, lastname,  contactno, password, user_type,picture
	    FROM public.users WHERE user_id = $1 ;`,
    [id],
    (error, results) => {
      if (error) {
        // throw error
        console.log(error);
      }
      res.status(200).json(results.rows[0]);
    }
  );
};