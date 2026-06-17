import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Contact from './pages/Contact/Contact'
import Users from './pages/Users/Users'
import Dashboard from './pages/Dashboard/Dashboard'

import { ToastContainer } from 'react-toastify';

const App = () => {

  const url = "http://localhost:4001";
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <ToastContainer />
      <Navbar setShowSidebar={setShowSidebar} />
      <hr />
      <div className="app-content">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="page-content">
          <Routes>
            <Route path='/' element={<Dashboard url={url}/>}/>
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/Orders' element={<Orders url={url} />} />
            <Route path='/contact' element={<Contact url={url} />} />
            <Route path='/users' element={<Users url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
