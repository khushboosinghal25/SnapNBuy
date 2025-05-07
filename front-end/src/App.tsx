import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header'; 
import Footer from './Components/Footer'; 
import Home from './Pages/Home'; 
import Shop from './Pages/Shop'; 
import Cart from './Pages/Cart'; 
import LoginPage from './Components/Login'; 
import RegisterPage from './Components/Register'
import PrivateRoute from './Components/PrivateRoute'; 
import ProductDetail from './Components/ProductDetails';
import Wishlist from './Components/WishList';
import Orderlist from './Components/OrderList';
import SubscriptionPage from './Components/SubscrptionPage';
import { CouponsProvider } from './context/CouponsContext';
const App: React.FC = () => {
  return (
    <CouponsProvider>
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            
            <Route element={<PrivateRoute />}>
              <Route path="/shop" Component={Shop} />
              <Route path="/cart" Component={Cart} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/wishlist" Component={Wishlist} />
              <Route path="/orderHistory" Component={Orderlist} />
              <Route path="/subscribe" Component={SubscriptionPage} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
    </CouponsProvider>
  );
};

export default App;

