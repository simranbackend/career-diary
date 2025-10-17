const express = require ('express');
const app = express();
require('dotenv').config({ path: '../.env' });
const PORT = process.env.SERVER_PORT || 4000;
const routers = require('./routes/index-route');

app.use(routers);

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});