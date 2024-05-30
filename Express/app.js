const express = require('express');
const app = express();
const CORS = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { PORT = 3000, DB_URL = 'mongodb+srv://Olga_Wu:********@cluster0.zwvxuxe.mongodb.net/' } = process.env;


mongoose.connect(DB_URL)
  .then((e) => console.log("DB - connect"))
  .catch((err) => console.log(`Error ${err}`));


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS())
app.use('/', router)
app.use(helmet());
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Link: http://localhost:${PORT}`);
  });