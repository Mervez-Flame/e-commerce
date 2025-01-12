/* eslint-disable no-unused-vars */
import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import bannermens from './assets/bannermens.png'
import bannerwomens from './assets/bannerwomens.png'
import bannerkids from './assets/bannerkids.png'
import Credentials from './pages/Credentials';



const App = () => {
  return (
    <main className='overflow-hidden w-full'>
      {/* <h1 className='font-extralight underline'> Hello World</h1> */}
      {/* <s> Hello World</s> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mens" element={<Category banner={bannermens} category="men" />} />
        <Route path="/womens" element={<Category banner={bannerwomens}  category="women"/>} />
        <Route path="/kids" element={<Category banner={bannerkids}  category="kid"/>} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart-page" element={<Cart />} />
        <Route path="/login" element={<Credentials />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App