var db=require('../config/connection')
var collection=require('../config/collection')

module.exports={
    addproduct:(products,callback)=>{
        console.log(products);
        db.get.collection('products').insertOne(products).then((data)=>{
            let obj=data.insertedId
            
            callback(obj)

        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
          let products=await db.get.collection(collection.PRODUCT_COLLECTION).find().toArray()
          resolve(products)
        })
      }
}