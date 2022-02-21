import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEditClient from './Screens/AddEditClient';
import Clients from './Screens/Clients';
import Home from './Screens/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Clients' element={<Clients />} />
        <Route path='/addClient' element={<AddEditClient />} />
        <Route path='/updateClient/:id' element={<AddEditClient />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;