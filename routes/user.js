var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
var UserHelper=require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
 
  productHelper.getAllProducts().then((products)=>{
    
    res.render('user/view-products',{owner:false,products});
  })
});
router.get('/ulogin',(req,res)=>{
  res.render('user/ulogin')
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
  
})
router.post('/signup', (req, res) => {
  UserHelper.doSignup(req.body, (error, response) => {
      if (error) {
          console.error('Error during signup:', error);
          res.status(500).send('Signup failed. Please try again later.');
      } else {
          console.log('User signed up successfully. Response:', response);
          res.status(200).send('Signup successful!');
      }
  });
});




module.exports = router;
