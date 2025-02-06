const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { Console } = require("console");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// Database 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'style_haven',
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error: ', err.message);
        return;
    }
    console.log('✅ Connected to the database!');
});

// Database connection with MongoDB
// mongoose.connect("mongodb+srv://StyleHavenAdmin:User123Style@freecluster.ymn6e.mongodb.net/stylehaven-jason?retryWrites=true&w=majority&appName=FreeCluster");

// mongoose.connect('mongodb://localhost:5173')
// .then(() =>{
//     console.log('Database Connection Verified');
// })
// .catch(()=>{
//     console.log('Failed To Connect');
// })

// ✅ Database Connection (MongoDB)
mongoose
    .connect("mongodb+srv://StyleHavenAdmin:User123Style@freecluster.ymn6e.mongodb.net/stylehaven-jason")
    .then(() => console.log("✅ MongoDB Connection Verified"))
    .catch((err) => console.log("❌ MongoDB Connection Failed", err));


// API Creation
app.get("/", (req, res) => {
    res.send('Express App is running');
});

// Register Endpoint
app.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;

    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) return res.json({ message: "User already exists! You will be redirected to Log In" });

        // Hash Password & Save User
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";

        db.query(sql, [name, username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User registered successfully! You will be redirected to Log In" });
        });
    });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;


    db.query('SELECT * FROM users WHERE Email = ? and Password = ?', [email, password], async (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(400).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            console.log('Wrong Email or Password')
            return res.status(500).json({ message: 'Wrong Email or Password' });
        } if (result.length === 1) {
            return res.json({ message: `Logged in Successfuly` });
        }
    })
})

//  Image Storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});


//Create Upload Endpoint
const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    })
});



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