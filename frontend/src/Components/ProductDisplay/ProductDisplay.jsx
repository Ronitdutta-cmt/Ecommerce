import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/Frontend_Assets/star_icon.png'
import star_dull_icon from '../Assets/Frontend_Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const sizes = ['S', 'M', 'L', 'XL', 'XXL']

const ProductDisplay = (props) => {
    const { product } = props
    const { addToCart } = useContext(ShopContext)
    const [selectedSize, setSelectedSize] = useState('M')

    const handleAddToCart = () => {
        addToCart(product.id)
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>

            <div className="productdisplay-right">
                <div className="productdisplay-right-badge">Trending now</div>
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_dull_icon} alt="star" />
                    <p>4.8 • 122 reviews</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A polished everyday staple designed for comfort and style. Soft fabric, modern silhouette, and a flattering fit make it perfect for casual outings or a relaxed weekend look.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                className={`size-pill ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <p className="productdisplay-right-size-info">
                        Selected size: <strong>{selectedSize}</strong>
                    </p>
                </div>
                <button className="productdisplay-right-addcart" onClick={handleAddToCart}>
                    Add to cart • {selectedSize}
                </button>
                <div className="productdisplay-right-highlights">
                    <span>Free shipping over $50</span>
                    <span>Easy returns</span>
                    <span>Fast delivery</span>
                </div>
                <p className="productdisplay-right-category">
                    <span>Category: <span>Women, T-shirt, Sun Dress</span></span>
                    <span>Tags: <span>Modern, Latest, Sun Dress</span></span>
                </p>
            </div>
        </div>
    )
}

export default ProductDisplay
