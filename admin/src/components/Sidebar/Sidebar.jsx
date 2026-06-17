import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdAddCircleOutline, MdListAlt, MdShoppingBag, MdMessage, MdPeople } from 'react-icons/md'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <div className="sidebar-options">
        <NavLink to='/' className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <MdDashboard size={24} />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <MdAddCircleOutline size={24} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <MdListAlt size={24} />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <MdShoppingBag size={24} />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/contact' className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <MdMessage size={24} />
          <p>Contact Messages</p>
        </NavLink>
        <NavLink to='/users' className="sidebar-option" onClick={() => setShowSidebar(false)}>
          <MdPeople size={24} />
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
