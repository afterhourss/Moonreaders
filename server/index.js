const express = require("express");
const app = express();
const pool = require('./config/db.js')
const auth = require('./routes/auth.js')
const middle = require('./middleware/auth.js')

const cors = require("cors");
require('dotenv').config()

app.use(cors());
app.use(express.json());

// routes
// create

// get
app.get('/book', async(req, res) => { //jika routenya pada servernya diarahkan ke '/', maka jalankan server GET untuk mendapatkan semua data buku
    try{
        const allBook = await pool.query('SELECT book.*, review.rating FROM book LEFT JOIN review ON review.id_book = book.id_book')
        res.json(allBook.rows);
    }catch (err){
        console.error(err.message)
    }
})

app.get('/category', async(req, res) => {
    try{
        const allCategory = await pool.query('SELECT * FROM category')
        res.json(allCategory.rows);
    }catch (err){
        console.error(err.message)
    }
})

//get spesific book

app.get('/info/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const infoBook = await pool.query('SELECT * FROM book WHERE id_book = $1',[id])
        res.json(infoBook.rows)
    } catch (error) {
        console.log(err.message)
    }
})

app.use('/auth', auth) //middleware untuk menjalankan route lainnya


const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`server has started on port ${PORT}`);
});
