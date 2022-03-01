import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEditClient from './Screens/AddEditClient';
import AddEditMeasure from './Screens/AddEditMeasure';
import AddOrder from './Screens/AddOrder';
import AddEditProduct from './Screens/AddEditProduct';
import Clients from './Screens/Clients';
import Home from './Screens/Home';
import Measures from './Screens/Measures';
import Orders from './Screens/Orders';
import Products from './Screens/Products';
import ViewClient from './Screens/ViewClient';
import ViewMeasure from './Screens/ViewMeasure';
import ViewProduct from './Screens/ViewProduct';
import ViewOrder from './Screens/ViewOrder';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Clients Routes */}
        <Route path='/Clients' element={<Clients />} />
        <Route path='/addClient' element={<AddEditClient />} />
        <Route path='/updateClient/:id' element={<AddEditClient />} />
        <Route path='/viewClient/:id' element={<ViewClient />} />
        {/* Product routes */}
        <Route path='/Products' element={<Products />} />
        <Route path='/addProduct' element={<AddEditProduct />} />
        <Route path='/updateProduct/:id' element={<AddEditProduct />} />
        <Route path='/viewProduct/:id' element={<ViewProduct />} />
        {/* Measure routes */}
        <Route path='/Measures' element={<Measures />} />
        <Route path='/addMeasure' element={<AddEditMeasure />} />
        <Route path='/viewMeasure/:id' element={<ViewMeasure />} />
        <Route path='/updateMeasure/:id' element={<AddEditMeasure />} />
        {/* Order Routes */}
        <Route path='/Orders' element={<Orders />} />
        <Route path='/addOrder' element={<AddOrder />} />
        <Route path='/viewOrder/:id' element={<ViewOrder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
