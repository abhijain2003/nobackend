import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Schema from './component/Schema';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Database from './component/Database';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createSchema' element={<Schema />} />
          <Route path='/database' element={<Database />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
