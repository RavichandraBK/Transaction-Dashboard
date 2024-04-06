const express = require('express');
const app = express();
const mong = require('mongoose');
require('dotenv').config();
const Cors = require('cors');
const bodyParser = require('body-parser');
const DBItems = require('./Models/products');
const axios = require('axios');
const allProducts = require('./Routes/products');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(Cors())

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json('Internal server error');
})
app.use('/api/products',allProducts);

DBItems.countDocuments({})
  .then(async (count) => {
    if (count > 0) {
      console.log('Products already exist in the database.');
      return;
    }

    // Fetch products from external API
    try {
       
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const productsData = response.data
      
      
      // Save products to MongoDB using Mongoose
      await DBItems.create(productsData);

      console.log('Products saved successfully!');
    } catch (error) {
      console.error('Error fetching or saving products:', error);
    }
  })
  .catch(error => {
    console.error('Error checking product count:', error);
  });

app.listen(process.env.PORT,(req,res)=>{
    mong.connect(process.env.MongoDB_URL).then(()=>{
        console.log('Connected to DB');
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    })
})