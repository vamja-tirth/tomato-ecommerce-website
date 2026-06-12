import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Menu.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Menu = () => {
  const location = useLocation();
  const [category, setCategory] = useState(location.state?.category || "All");

  return (
    <div className='menu-page'>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} setCategory={setCategory} />
    </div>
  )
}

export default Menu
