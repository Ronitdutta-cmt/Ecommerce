import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/Admin_Assets/upload_area.svg'

const AddProduct = () => {
  //logic for : when a img is selected , its thumbnail will be shown on screen . 
  const [image , setImage] = useState(false)  ; 

  //thru this we'll add the pdts in the db . 
  const [productDetails , setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })

  const imageHandler = (e)=>{
      setImage(e.target.files[0]) ; 
  }
  const changeHandler=(e)=>{
    setProductDetails({...productDetails,
                          [e.target.name]:e.targer.value})
  }
  const Add_product = async()=>{
      console.log(productDetails) ; 
      //now linking this addProduct page to backend .
      let responseData ; 
      let product = productDetails ;  // from state . 

      let formData = new FormData() ;   // creates emptu form data . 
      formData.append('product' , image) ; 

      //now sending this form data to api . 
      await fetch('http:localhost:4000/upload' , { method:'POST' ,
                                                   headers:{
                                                    Accept:'application/json'} ,
                                                    body:formData,
                }).then((resp)=>resp.json()).then((data)=>{responseData=data})

            if(responseData.success)
            {
              product.image = responseData.image_url ;
              console.log(product)  ; 
              await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                        Accept:'application/json',
                        'Content-Type ': 'application/json' , 
                },
                body:JSON.stringify(product) ,
              }).then((resp)=>resp.json()).then((data)=>{
                    data.success?alert("Product Added") : alert("Failed")
              })
            }
  }

  return (

    <div className='add-product'>
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input  value={productDetails.name}
                  onChange={changeHandler}
                type="text" name='name' placeholder='type here ' />
        </div>

        <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input value={productDetails.old_price}
                      onChange={changeHandler}
                   type="text" name='old_price' placeholder='type here '  />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer price</p>
              <input  value={productDetails.new_price}
                      onChange={changeHandler}
                    type="text"  name='new_price' placeholder='type here'/>
            </div>
        </div>

      <div className="addproduct-itemfield">
        <p>Product categrory</p>
        <select  value={productDetails.category}
                  onChange={changeHandler}
                  name="category" className='add-product-selector' id="">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} 
               className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="text" name='image' id='file-input' hidden />
      </div>
      <button  onClick={()=>{Add_product()}} className="addproduct-btn"></button>
      
    </div>
  )
}

export default AddProduct
