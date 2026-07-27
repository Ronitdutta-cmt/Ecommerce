import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return false
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }

    if (!isLogin && !formData.name) {
      setError('Name is required for sign up')
      return false
    }

    if (!isLogin && !agree) {
      setError('Please agree to the terms and conditions')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Simulate successful login/signup
    console.log(isLogin ? 'Logging in...' : 'Signing up...', formData)
    
    // Redirect to home page after successful authentication
    navigate('/')
  }

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

            <div className="loginsignup-fields">
                {!isLogin && (
                  <input 
                    type="text" 
                    name="name"
                    placeholder='Your name' 
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}
                <input 
                  type="email" 
                  name="email"
                  placeholder='Email address' 
                  value={formData.email}
                  onChange={handleChange}
                />
                <input 
                  type="password" 
                  name="password"
                  placeholder='Password' 
                  value={formData.password}
                  onChange={handleChange}
                />
            </div>
            {error && <p className="loginsignup-error">{error}</p>}
            <button onClick={handleSubmit}>Continue</button>
            <p className="loginsignup-login">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ name: '', email: '', password: '' })
                  setError('')
                  setAgree(false)
                }}>
                  {isLogin ? 'Sign up here' : 'Login here'}
                </span>
            </p>
            {!isLogin && (
              <div className="loginsignup-agree">
                <input 
                  type="checkbox" 
                  id="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <p>By Continuing , i agree to the terms and conditions .</p>
              </div>
            )}

        </div>      
    </div>
  )
}

export default LoginSignup
