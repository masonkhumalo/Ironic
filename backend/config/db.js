const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres', //change to admin
    host: 'localhost',
    database: 'Joint',
    password: '12345', //change to 12345
    port: 5000,
})


//Test db connection
pool.connect((err, ) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    } else {
        console.log("Database connected!!!");
    }
})



module.exports = pool;