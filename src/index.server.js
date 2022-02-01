const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();

//Routes
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin/auth');
const reqRoute = require('./routes/request');
const fcatRoute = require('./routes/freightCat');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/payment');

//Environment Variables
env.config();

//Database Connection
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.60giw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ).then(() => {
        console.log('Database Connected')
    }
);

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use('/api', authRoute);
app.use('/api', adminRoute);
app.use('/api', reqRoute);
app.use('/api', fcatRoute);
app.use('/api', cartRoute);
app.use('/api', orderRoute);
app.use('/api', paymentRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});