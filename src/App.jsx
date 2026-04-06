import React from 'react' 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
 import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import AboutUs from './pages/AboutUs'
// import Products from './pages/Products'
import Home from './pages/Home'
import Footer from './components/Footer'
import TestimonalsPage from './components/TestimonalsPage'
import Blogs from './pages/Blogs'
import BlogDetail from './components/BlogDetail'
// import Blogs from './components/Blogs'
// import ScrollToTop from './components/ScrollToTop'
 import AccessoryDetail from './pages/AccessoryDetail'
// import BlogDetail from './components/BlogDetail'
import AccessoryLayout from './pages/AccessoryLayout'
// import WhatsappFloat from './components/WhatsappFloat'
// import ChatbotFloat from './components/ChatbotFloat'
import Infrastructure from './pages/Infrastructure'
import ContactUs from './pages/ContactUs'
 import AccessoryProductDetailPage from './pages/AccessoryProductDetailPage'
import TrendingUsage from './pages/TrendingUsage'
import AllProducts from './pages/AllProducts'
import Faq from './pages/Faq'
// import ContactUs from './pages/ContactUs'
import WhatsappFloat from './pages/WhatsapFloat'
import ChatbotFloat from './pages/ChatboatFloat'
// import Interv from './pages/Interv'

function App() {


  return (
    <>
     <BrowserRouter>
      {/* <ScrollToTop /> */}
     <Navbar/>
     <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/testimonals' element={<TestimonalsPage/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
       <Route path="/blog/:slug" element={<BlogDetail />} />
       <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/infrastructure' element={<Infrastructure />} />
            <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/products' element={<AllProducts />} />
                  <Route path='/accessories' element={<AccessoryLayout />}>
    <Route index element={<Navigate to="headbands" replace />} />
    <Route path=':type' element={<AccessoryDetail />} />
  </Route>
  <Route path='/accessories/:type/:productId' element={<AccessoryProductDetailPage/>}/>
  <Route path='/trending' element={<TrendingUsage/>}/>
  <Route path='/faq' element={<Faq/>}/>
      {/* <Route path='/aboutus' element={<AboutUs/>}/>
      // <Route path='/testimonals' element={<TestimonalsPage/>}/>
      <Route path='/products' element={<Products/>}/>
       <Route path='/infrastructure' element={<Infrastructure />} />
      <Route path='/blogs' element={<Blogs/>}/>
       <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path='/accessories' element={<AccessoryLayout />}>

    <Route path=':type' element={<AccessoryDetail />} />
    
   
  </Route>
  <Route path='/accessories/:type/:productId' element={<AccessoryProductDetailPage/>}/>
  <Route path='/faq' element={<Faq/>}/>
  <Route path='/contact' element={<ContactUs/>}/>
  <Route path='/contact' element={<ContactUs/>}/>
  <Route path='/interv' element={<Interv/>}/> */}
     </Routes>
     <Footer/>
     {/* <Footer/>
     <ChatbotFloat />
     <WhatsappFloat /> */}
     </BrowserRouter>
     <WhatsappFloat/>
     <ChatbotFloat/>
    </>
  )
  
}

export default App
