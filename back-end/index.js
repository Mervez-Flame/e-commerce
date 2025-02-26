const port = process.env.PORT || 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mysql = require('mysql');
const { Console } = require("console");
require("dotenv").config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URL = process.env.MONGO_URL;
const allowedOrigins = [
    'http://localhost:5173',
    'https://e-commerce-topaz-nine-72.vercel.app'
];

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));



// Database Init
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'style_haven',
//     port:3306,
// });

// // Database Connect
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection error: ', err.message);
//         return;
//     }
//     console.log('✅ Connected to the database!');
// });

// Database connection with MongoDB
// mongoose.connect('mongodb://localhost:5173')
mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB Connection Verified"))
    .catch((err) => console.log("❌ MongoDB Connection Failed", err));

// ✅ Define User Schema
const UserSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId }, // Auto-generated
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

//Token Verification
const verifyToken = (req, res, next) => {
    // Extract token from cookies or Authorization header
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return res.status(403).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded user info to request
        next(); // Continue to the next function (route)
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        } else {
            return res.status(401).json({ message: 'Invalid token. Authentication failed.' });
        }
    }
};


// API Creation
app.get("/", (req, res) => {
    res.send('Express App is running');
});

//NoSQL Register API
app.post("/signup", async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists! You will be redirected to Log In" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, password: hashedPassword });

        await newUser.save();
        res.json({ message: "User registered successfully! You will be redirected to Log In" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// MySQL Register API 
// app.post('/signup', async (req, res) => {
//     const { name, username, email, password } = req.body;

//     // Check if user exists
//     db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (result.length > 0) return res.json({ message: "User already exists! You will be redirected to Log In" });

//         // Hash Password & Save User
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const sql = "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";

//         db.query(sql, [name, username, email, hashedPassword], (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ message: "User registered successfully! You will be redirected to Log In" });
//         });
//     });
// });

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "5m" });

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Lax" })
            .json({ message: "Login Successful!", token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// // Login Endpoint
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     db.query('SELECT * FROM users WHERE Email = ?', [email], async (err, result) => {
//         if (err) {
//             console.error(err.message);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         if (result.length === 0) {
//             return res.status(401).json({ message: 'Invalid Email or Password' });
//         }

//         const user = result[0];

//         // ✅ Check if user.password exists
//         if (!user.password) {
//             return res.status(500).json({ error: 'User password is missing in the database' });
//         }

//         // ✅ Check if the provided password is not empty
//         if (!password) {
//             return res.status(400).json({ error: 'Password is required' });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password); // Ensure user.Password matches database column

//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Invalid Email or Password' });
//         }

//         // ✅ Generate JWT Token
//         const token = jwt.sign({ id: user.id, email: user.Email }, SECRET_KEY, { expiresIn: '1h' });

//         // ✅ Store token in HTTP-only cookie for security
//         res.cookie('token', token, {
//             httpOnly: true, secure: true, sameSite: 'Lax' 
//         }).json({ message: 'Login Successful! You will shortly be redirected to the dashboard', token });
//     });
// });

//Verify Token To Stay Logged In For An Hour
app.post('/verify-token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ valid: true, user: decoded });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
});


app.get("/api/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// // Logged User Access
// app.get('/profile', verifyToken, (req, res) => {
//     const userId = req.user.id;

//     db.query("SELECT id, name, username, email FROM users WHERE id = ?", [userId], (err, result) => {
//         if (err) {
//             console.error("Error fetching user:", err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json(result[0]); // Return user data without password
//     });
// });

// Logged In Password Change
app.post('/change-password', verifyToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Fetch user from database
    db.query("SELECT password FROM users WHERE id = ?", [userId], async (err, result) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId], (err) => {
            if (err) {
                console.error("Error updating password:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            res.json({ message: "Password updated successfully!" });
        });
    });
});


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