import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>subsribe to our newletter and stay updated</p>
        <div>
            <input type="email"  placeholder='Your Email id'/>
            <button>Subsribe</button>
        </div>
    </div>
  )
}

export default NewsLetter
