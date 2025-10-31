const express = require('express');
const app = express();
const connectDB = require('./db/conn');
require('dotenv').config({ path: '../.env' }); 
const PORT = process.env.SERVER_PORT || 4000;
const cors = require('cors');

connectDB();

app.use(cors());
const routers = require('./routes/index-route'); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routers);

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
