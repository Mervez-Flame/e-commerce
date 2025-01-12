const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path =require("path");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://StyleHavenAdmin:User123Style@freecluster.ymn6e.mongodb.net/stylehaven?retryWrites=true&w=majority&appName=FreeCluster")