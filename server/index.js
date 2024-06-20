const express = require("express");
const app = express();
const pool = require('./config/db.js')
const auth = require('./routes/auth.js')

const cors = require("cors");
require('dotenv').config()

app.use(cors());
app.use(express.json());

// routes
// create

// get
app.get('/', async(req, res) => { //jika routenya pada servernya diarahkan ke '/', maka jalankan server GET untuk mendapatkan semua data buku
    try{
        const allBook = await pool.query('SELECT * FROM book')
        res.json(allBook.rows);
    }catch (err){
        console.error(err.message)
    }
})

app.use('/auth', auth) //middleware untuk menjalankan route lainnya

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`server has started on port ${PORT}`);
});
