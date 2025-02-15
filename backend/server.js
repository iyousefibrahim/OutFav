const dotenv = require('dotenv');
dotenv.config({ path: './.env' }); 

const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

let DBUrl = process.env.DATABASE_URL;
const DBPassword = process.env.DATABASE_PASSWORD;

DBUrl = DBUrl.replace('<PASSWORD>', DBPassword);

mongoose.connect(DBUrl)
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
});