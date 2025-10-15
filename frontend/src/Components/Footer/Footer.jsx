import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/Frontend_Assets/logo_big.png'
import insta from '../Assets/Frontend_Assets/instagram_icon.png'
import pint from '../Assets/Frontend_Assets/pintester_icon.png'
import whats from '../Assets/Frontend_Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Product</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={insta} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pint} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whats} alt="" />
                </div>
            </div>

            <div className="footer-copyright">
                <hr />
                <p>Copyright@ 2025 - Ronit Dutta</p>
            </div>
    </div>
  )
}

export default Footer
