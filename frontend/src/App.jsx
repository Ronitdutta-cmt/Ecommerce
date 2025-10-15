import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'

import {BrowserRouter , Routes , Route} from 'react-router-dom' ; 
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Productss from './pages/Productss';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/Frontend_Assets/banner_mens.png'
import women_banner from './Components/Assets/Frontend_Assets/banner_women.png'
import kid_banner from './Components/Assets/Frontend_Assets/banner_kids.png'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     <Navbar/>

     <Routes>
          <Route path='/' element={<Shop/>}  />
          <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}  />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}  />
          <Route path='/kids' element={<ShopCategory banner={kid_banner}  category="kids"/>}  />
          <Route path="/Products" element={<Productss/>} />
          <Route path = "/Productss/:productId" element={<Productss/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<LoginSignup/>}/>
     </Routes>
    <Footer/>

     </BrowserRouter>
    </>
  )
}

export default App
