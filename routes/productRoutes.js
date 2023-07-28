
const express = require('express');
const Product = require('../models/Product');
const router = express.Router() //mini server -> acts like app



// displaying all the products
router.get('/' , async(req,res)=>{
    let products = await Product.find({}); //finding the products
    res.render('index' , {products});
})

// Display the form to add a new quote
router.get('/new', (req, res) => {
    res.render('new');
  });

router.post('/', async (req, res) => {
    const { author, quote } = req.body;
    try {
      await Product.create({ author, quote });
      res.redirect('/'); 
    } catch (err) {
      console.error(err);
      res.redirect('/new'); 
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send('Quote not found.');
      }
      res.render('show', { product });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error.');
    }
  });
  



module.exports = router;