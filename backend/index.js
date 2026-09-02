const port = process.env.PORT || 4000; 
const express = require("express")  ;
const app = express() ; 
const mongoose = require("mongoose")  ; 
const jwt = require("jsonwebtoken") ; 
const multer = require("multer") ; 
const path = require("path") ; //using this we can get access to backend directory thru express app . 
const cors = require("cors") ;
const { getProducts, addFallbackProduct, removeFallbackProduct, getNextProductId } = require('./productStore');

// thru this all the request will be automatically parsed to json . 
app.use(express.json()) ; 
app.use(cors()) ; // using this out react app will connnect to exprss app  on port:4000 . 

let dbReady = false;
let dbError = null;

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {           
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });

        dbReady = true;
        console.log("MongoDB connected");
    } catch (error) {
        dbError = error;
        console.warn("MongoDB connection failed, continuing with fallback storage:", error.message);
    }
}

connectDatabase();
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
    try {
        if (dbReady) {
            const products = await Product.find({});
            const id = getNextProductId(products);
            const product = new Product({
                id,
                name:req.body.name ,
                image:req.body.image , 
                category:req.body.category ,
                new_price:req.body.new_price ,
                old_price:req.body.old_price 
            });
            await product.save();
            console.log("saved in db");
            return res.json({ success:true, name:req.body.name });
        }

        const product = addFallbackProduct(getProducts(), req.body);
        return res.json({ success:true, name: product.name });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success:false, message:error.message });
    }
})


// for del pdts 
app.post('/removeproduct' , async(req,res)=>{
    try {
        if (dbReady) {
            await Product.findOneAndDelete({id:req.body.id});
            console.log("removed");
            return res.json({ success:true, name:req.body.name });
        }

        removeFallbackProduct(getProducts(), Number(req.body.id));
        return res.json({ success:true, name:req.body.name });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success:false, message:error.message });
    }
})
// new thing

// to get all the pdts 
app.get('/allproducts' , async(req, res)=>{
    try {
        if (dbReady) {
            const products = await Product.find({});
            console.log("all pdts fetched");
            return res.send(products);
        }

        console.log("all pdts fetched from fallback store");
        return res.send(getProducts());
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success:false, message:error.message });
    }
}) 

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});