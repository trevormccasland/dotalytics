import React, { FC, ReactElement } from 'react'
import './CategorySideBar.css'
import { FaUserAlt, FaHistory, FaBan, FaChartLine, FaChartPie, FaCrosshairs } from 'react-icons/fa'

interface Category {
  name: string
  icon: ReactElement
}

interface CategorySideBarProps {
  onCategoryChange: (index: number) => void
  selectedIndex: number
}
const categories: Category[] = [
  {
    name: 'Team Win %',
    icon: <FaChartPie className='sideBarIcon' size={30} />
  },
  {
    name: 'Kills',
    icon: <FaCrosshairs className='sideBarIcon' size={30} />
  },
  {
    name: 'Hero Picks',
    icon: <FaUserAlt className='sideBarIcon' size={30} />
  },
  {
    name: 'Ban Picks',
    icon: <FaBan className='sideBarIcon' size={30} />
  },
  {
    name: 'Item Win Rate',
    icon: <FaChartLine className='sideBarIcon' size={30} />
  },
  {
    name: 'Hero Win Rate',
    icon: <FaChartLine className='sideBarIcon' size={30} />
  },
  {
    name: 'Match History',
    icon: <FaHistory className='sideBarIcon' size={30} />
  }
]
const CategorySideBar: FC<CategorySideBarProps> = ({ onCategoryChange, selectedIndex }): ReactElement => {
  return <div className='sideBarContainer'>
    {categories.map((category, i) => (
      <div key={i} className='sideBarItem' style={ selectedIndex === i ? { backgroundColor: 'gainsboro' } : {}}>
        <button className='sideBarButton' onClick={() => onCategoryChange(i)}>{category.name}</button>
        {category.icon}
      </div>
    ))}
  </div>
}

export default CategorySideBar
