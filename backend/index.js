const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()


// setting up a port
const port = process.env.PORT || 5000;



app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)



app.use(bodyParser.json());

var corsOptions = {
  Access_control_allow_origin:"*",
  origin: "*",
  methode:['GET','POST','DELETE','PUT'],
  allowedheaders : 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}
app.use(cors(corsOptions));


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


// app.use('/register', register);


// using the auth routes
// require('./routes/auth.route')(app)

app.listen(port, () => {
    console.log(`Server Engine Up & Running On Port http://localhost:${port}`)
})