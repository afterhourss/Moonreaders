const express = require("express");
const multer = require('multer')
const pool = require('./config/db.js')
const auth = require('./routes/auth.js')
const middle = require('./middleware/auth.js')
const path = require('path')

const app = express();

const cors = require("cors");
require('dotenv').config()

app.use(cors());
app.use(express.json());


//multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

//this will user upload var as parameter below
const upload = multer({storage: storage})
// routes
// create

// get book
app.get('/book', async(req, res) => { //jika routenya pada servernya diarahkan ke '/', maka jalankan server GET untuk mendapatkan semua data buku
    try{
        const allBook = await pool.query('SELECT book.*, review.rating FROM book LEFT JOIN review ON review.id_book = book.id_book')
        res.json(allBook.rows);
    }catch (err){
        console.error(err.message)
    }
})

//get book of the year
app.get('/book/boty', async(req,res) => {
    try {
        const botyBook = await pool.query('SELECT * FROM book WHERE boty = $1', [true])
        res.json(botyBook.rows)
    } catch (error) {
        console.error(error.message)
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
        const infoBook = await pool.query(`SELECT book.*, ARRAY_AGG(author.name) AS author_name
            FROM book_author
            JOIN book ON book_author.id_book = book.id_book
            JOIN author ON book_author.id_author = author.id_author
            WHERE book.id_book = $1
            GROUP BY book.id_book, book.title`,[id])
        res.json(infoBook)
    } catch (error) {
        console.log(err.message)
    }
})

//upload image
app.post('/user/profile/upload', upload.single('avatar'), (req, res) => {
    if(!req.file) {
        return res.status(400).send('No file uploaded')
    }
    res.send({filePath: `/uploads/${req.file.filename}`})
})

//remove image
app.put('/user/profile/remove/:id_user', async(req,res) => {
    try {
        const { id_user } = req.params;
        const setToDefaultProfile = await pool.query('UPDATE users SET profile = \'/profile/default-profile.jpg\' WHERE id_user = $1',[id_user])
        res.json("profile has removed")
    } catch (error) {
        res.send().status(400)
    }
})

//remove user
app.delete('/user/delete/:id_user', async(req,res) => {
    try {
        const { id_user } = req.params;
        const deleteUser = await pool.query('DELETE FROM users WHERE id_user = $1',[id_user])
        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


//make path below static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', auth) //middleware untuk menjalankan route lainnya


const PORT = process.env.PORT;

app.listen(5000, () => {
  console.log(`server has started on port ${PORT}`);
});


