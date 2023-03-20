
module.exports = app => {
    const user  = require('../controllers/register');
    app.post('/register' , user.add); 
    
}

