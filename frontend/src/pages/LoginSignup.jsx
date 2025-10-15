import React from 'react'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Sign Up</h1>

            <div className="loginsignup-fields">
                <input type="text" placeholder='Your name' />
                <input type="text" placeholder='Email address' />
                <input type="text" placeholder='Password' />
            </div>
        <button>Continue</button>
        <p className="loginsignup-login">
            Already have an account? <span>Login here </span>
        </p>
        <div className="loginsignup-agree">
            <input type="checkbox" name='' id=''  />
            <p>By Continuing , i agree to the terms and conditions .</p>
        </div>

        </div>      
    </div>
  )
}

export default LoginSignup
