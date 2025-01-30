const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// Database connection with MongoDB
mongoose.connect("mongodb+srv://StyleHavenAdmin:User123Style@freecluster.ymn6e.mongodb.net/stylehaven-jason?retryWrites=true&w=majority&appName=FreeCluster");

// API Creation
app.get("/", (req, res) => {
    res.send('Express App is running');
});

//  Image Storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

// Database 
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'votingapp'
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Voting App Connected.....')

// });

//Create Upload Endpoint
const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    })
});


// Register Endpoint
app.post('/register', (req, res) => {

    const { firstName, lastName, department, email, matricNumber, phoneNumber, password } = req.body;


    db.query('SELECT * FROM users WHERE Email = ?', [email], async (err, result) => {
        if (err) {
            console.error(" There is an error");
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {

            // Now, you can insert data into the Curriculum table
            const insertDataQuery = `INSERT INTO users (FirstName, LastName, Department, Email, PhoneNumber, MatricNumber, Password ) VALUES (?, ?, ?, ?, ?, ?, ?);`;

            const values = [firstName, lastName, department, email, phoneNumber, matricNumber, password];

            db.query(insertDataQuery, values, (err) => {
                if (err) {
                    console.error(err);
                    throw new error('Error inserting data');
                }
                return res.json({ message: `Account Registered successfully` });

            });

        } else {
            res.redirect("/login")
            return res.json({ message: `Acount already exists` });
        }

    })


})

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;


    db.query('SELECT * FROM users WHERE Email = ? and Password = ?', [email, password], async (err, result) => {
        if (err) {
            console.error(" There is an erro err");
            return res.status(400).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            console.log('Wrong Email or Password')
            return res.status(500).json({ message: 'Wrong Email or Password' });
        } else {
            return res.json({ message: `Logged in Successfuly` });
        }
    })
})

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Create Product Endpoint
app.post('/addproduct', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date,
        available: req.body.available,
    });
});

// Proof of Runtime
app.listen(port, (error) => {
    if (!error) {
        console.log('Server is running at port ' + port);
    }
    else {
        console.log('Error: ' + error);
    }
});