var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
 productHelper.getAllProducts().then((products)=>{
  console.log(products)
  res.render('owner/view-products',{owner:true,products});

 })
let vegetables = [{ name: 'Tomato', category: 'Vegetables', description: '50/kg', image: 'https://img.freepik.com/free-photo/tomatoes_144627-15413.jpg?size=626&ext=jpg&ga=GA1.1.1249537372.1695249140&semt=sph' },
  { name: 'Potato', category: 'Vegetables', description: '50/kg', image: 'https://img.freepik.com/free-photo/fresh-background-potatoes-close-nutrition_1203-6026.jpg?size=626&ext=jpg&ga=GA1.2.1249537372.1695249140&semt=sph' },
  { name: 'Brinjal', category: 'Vegetables', description: '50/kg', image: 'https://img.freepik.com/free-photo/eggplant_144627-18693.jpg?size=626&ext=jpg&ga=GA1.1.1249537372.1695249140&semt=sph' },
  { name: 'Betroot', category: 'Vegetables', description: '50/kg', image: 'https://img.freepik.com/free-photo/beetroot_144627-20884.jpg?size=626&ext=jpg&ga=GA1.1.1249537372.1695249140&semt=sph' },
  { name: 'Carrot', category: 'Vegetables', description: '50/kg', image: 'https://img.freepik.com/free-photo/baby-carrots_1339-7954.jpg?size=626&ext=jpg&ga=GA1.1.1249537372.1695249140&semt=sph' }
  ]
  //res.render('owner/view-products',{owner:true,products,vegetables});
  
});
router.get('/add-product',function(req,res){
  
  res.render('owner/add-product')
  
});
router.post('/add-product',(req,res)=>{
  
  console.log(req.body)
  console.log(req.files.image)
  productHelper.addproduct(req.body,(id)=>{
    let image=req.files.image
    image.mv('./public/product-image/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('owner/add-product')
      }
      else{
        console.log(err)
      }
    })
    
  })
})

module.exports = router;
