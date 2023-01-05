import React, { FC, ReactElement } from 'react'
import './CategorySideBar.css'

interface CategorySideBarProps {
  onCategoryChange: (index: number) => void
  selectedIndex: number
}

const CategorySideBar: FC<CategorySideBarProps> = ({ onCategoryChange, selectedIndex }): ReactElement => {
  return <div className='sideBarContainer'>
    <button className='sideBarButton' style={ selectedIndex === 0 ? { backgroundColor: 'gainsboro' } : {}} onClick={() => onCategoryChange(0)}>Team Win %</button>
    <button className='sideBarButton' style={ selectedIndex === 1 ? { backgroundColor: 'gainsboro' } : {}} onClick={() => onCategoryChange(1)}>Kills</button>
    <button className='sideBarButton' style={ selectedIndex === 2 ? { backgroundColor: 'gainsboro' } : {}} onClick={() => onCategoryChange(2)}>Hero Picks</button>
    <button className='sideBarButton' style={ selectedIndex === 3 ? { backgroundColor: 'gainsboro' } : {}} onClick={() => onCategoryChange(3)}>Ban Picks</button>
    <button className='sideBarButton' style={ selectedIndex === 4 ? { backgroundColor: 'gainsboro' } : {}} onClick={() => onCategoryChange(4)}>Item Win Rate</button>
    <button className='sideBarButton' style={ selectedIndex === 5 ? { backgroundColor: 'gainsboro' } : {}} onClick={() => onCategoryChange(5)}>Hero Win Rate</button>
    <button className='sideBarButton' style={ selectedIndex === 6 ? { backgroundColor: 'gainsboro' } : {}} onClick={() => onCategoryChange(6)}>Match History</button>
  </div>
}

export default CategorySideBar
