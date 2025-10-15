import React from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';

const Productss = () => {
  // getting all pdt data using context 
  const {all_product} =  useContext(shopContext) ; 
  const {productId} = useParams() ;
  const product = all_product.find( (e)=> e.id ===Number(productId) )

  return (
    <div>
      {/* passing props product */}
        <Breadcrums product={product}/>  
        <ProductDisplay product={product}/> 
        <DescriptionBox/>
    </div>
  )
}

export default Productss
