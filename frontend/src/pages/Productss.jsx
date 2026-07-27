import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import { ShopContext } from '../Context/ShopContext';

const Productss = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId)) || all_product[0];

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p>The requested product is unavailable right now.</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#fffaf9' }}>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
    </div>
  )
}

export default Productss
