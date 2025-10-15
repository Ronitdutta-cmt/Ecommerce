const port = 4000 ; 
const express = require("express")  ;
const app = express() ; 
const mongoose = require("mongoose")  ; 
const jwt = require("jsonwebtoken") ; 
const multer = require("multer") ; 
const path = require("path") ; //using this we can get access to backend directory thru express app . 
const cors = require("cors") ;
const { stringify } = require("querystring");

// thru this all the request will be automatically parsed to json . 
app.use(express.json()) ; 
app.use(cors()) ; // using this out react app will connnect to exprss app  on port:4000 . 

//connection with atlas using compass .
mongoose.connect("mongodb+srv://RonitDutta:databasekapasswordh@cluster0.atdc9wp.mongodb.net/e-commerce") ; 

//APi endpoint 

app.get("/" , (req, res)=>{
    res.send("express app running") ; 
  })


  //image storage engine 
  // see explaination of this . 
  const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req , file , cb )=>{
        return cb(null , `${file.fieldname}_${Date.now()} ${path.extname(file.originalname)}`) ; 
    }
  })

//  passing the above configuration in this .
const upload = multer({storage:storage }) 


// 1.)  using this end-pnt we can upload the images 
app.use('/images' , express.static('upload/images')) 

app.post("/upload" , upload.single('Product'),(req,res)=>{
    res.json({
        success:1,
        //req m aaya hua naam se hi img k url generate kr rhe .
        image_url: `http://localhost:${4000}/images/${req.file.filename}`
    })
})


// 2.) this will add pdt to db . 
    //schema for creating products 
const Product = mongoose.model("Product" , {  
    id:{
        type:Number , 
        required:true 
    },
    name:{
        type:String,
        required:true 
    },
    image:{
        type:String , 
        required:true
    } ,
    category:{
        type:String , 
        required:true 
    },
    new_price:{
        type:Number , 
        required:true
    },
    old_price:{
        type:Number , 
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean , 
        default:true 
    }

})

app.post('/addproduct' , async(req ,res)=>{

    // logic for auto-gen of id 
    let products = await Product.find({})  ;  
    let id ;
    if(products.length > 0)
    {
        let last_product_array = products.slice(-1) ; // will give last updated pdt .
        let last_product = last_product_array[0] ; 
        id = last_product.id + 1 ; 
    }
    else{
        id =1 ; 
    }



    const product = new Product({
        id:id ,
        name:req.body.name ,
        image:req.body.image , 
        category:req.body.category ,
        new_price:req.body.new_price ,
        old_price:req.body.old_price 
    });
    console.log(product) ; 
    await product.save() ; //saving in db takes time , so using await .
    console.log("saved in db ")  ; 

    res.json({ // msg for front-end . 
        success:true ,
        name : req.body.name 
    })
})


// for del pdts 
app.post('/removeproduct' , async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id}); 
    console.log("removed") ; 
    res.json({
        success:true , 
        name : req.body.name 
    })
})


// to get all the pdts 
app.get('/allproducts' , async(req, res)=>{
    let products =  await Product.find({}) ;  // this will get all the pdts . 
    console.log("all pdts fetched ") ; 
    res.send(products) ; 
})


app.listen(port , (error)=>{
    if(!error) // if no error 
    {
        console.log("Server running on port : " + port ) ;
    }
    else{
        console.log("Error : "+ error) ; 
    }
}) 