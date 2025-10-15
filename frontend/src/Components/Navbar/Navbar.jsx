import React, { useContext, useState } from 'react'

import logo from '../Assets/Frontend_Assets/logo.png'
import cart_logo from '../Assets/Frontend_Assets/cart_icon.png'
import './Navbar.css';  
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png' 

const Navbar = () => {

    const[menu , setMenu] = useState("shop") ; 
    const{ getTotalCartItems} = useContext(ShopContext) ; 
    const menuRef = useRef() ; // for responsive icon --> triple line wla . 

    const dropdown_toggle = (e)=>{ // here the event is image tag 
        menuRef.current.classList.toggle('nav-menu-visible') ; 
        //when we click on the img , it will add open tag to the img , clicking on it again will remove it . 
        e.target.classList.toggle('open') ; 
    }

  return (
    <div className='navbar'>   

        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>

        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />

        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}> <Link to='/'> Shop </Link>  {menu === "shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Mens")}}> <Link to='/men'>Men</Link> {menu === "Mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Women")}}><Link to='/women'>Women</Link>  {menu === "Women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Kids")}}><Link to='/kids'>Kids</Link>  {menu === "Kids"?<hr/>:<></>}</li>
        </ul>

        <div className="nav-login-cart">
            <Link to='/login'></Link><button>Login</button>
            <Link to='/cart'></Link><img src={cart_logo} alt="" />
            <div className="nav-cart-count"> { getTotalCartItems()} </div>
        </div>
    
    </div>
  )
}

export default Navbar
