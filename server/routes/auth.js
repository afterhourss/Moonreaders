const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

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

        //generate jwt token
        const payload = {id: user.id_user}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.json(token)

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



    }catch(err){
        console.log(err);
        res.status
    }
})

module.exports = router;