const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const middle = require('../middleware/auth')
require('dotenv').config();

const router = express.Router();

//generate jwt token
function jwtGenerate(user){
    const payload = {username: user.username}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
    return { token };
}

router.post('/register', async(req, res) => {
    try{
        const {username, password} = req.body; //jika terjadi post pada /auth/register, maka username akan didestructuring dari body

        const user = await pool.query('SELECT * FROM users WHERE username = $1',[username]) //query apakah username tersebut ada, jika rowsnya ada register gagal

        //lanjut kode ini
        if(user.rows.length !== 0){
            return res.status(401).send('user already exist'); //401 mean unauthorized
        }

        //bcrypt user passwordnya
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt)
        const newUser = await pool.query('INSERT INTO users(username, password) VALUES($1,$2)',[username, bcryptPassword])
        // generate jwt token
        // res.json(jwtGenerate(newUser.rows[0].id_user))

    }catch(err){
        console.log(err)
    }
})



//login route
router.post('/login', async(req,res) => {
    try{
        const {username, password} = req.body
        const user = await pool.query('SELECT * FROM users WHERE username = $1',[username])

        //cek apakah user benar benar ada, jika tidak maka invalid
        if(user.rows.length === 0){
            return res.status(401).send('Invalid username and password');
        }

        //cek apakah login password sama dengan database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password)

        if(!validPassword){
            return res.status(401).send('Invalid username and password')
        }

        res.json(jwtGenerate(user.rows[0]))

    }catch(err){
        console.log(err);
        res.status(401).send('Invalid')
    }
})

router.post('/protected', middle, async(req,res) => {
    // res.json(req.username)
    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [req.username])
        res.json({auth: true, data: user})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;