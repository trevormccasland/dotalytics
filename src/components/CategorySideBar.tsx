import React, { FC, ReactElement, useMemo, useState } from 'react'
import './CategorySideBar.css'
import { FaArrowRight, FaArrowLeft, FaUserAlt, FaHistory, FaBan, FaChartLine, FaChartPie, FaCrosshairs } from 'react-icons/fa'

interface Category {
  name: string
  icon: ReactElement
}

interface CategorySideBarProps {
  onCategoryChange: (index: number) => void
  selectedIndex: number
}

const CategorySideBar: FC<CategorySideBarProps> = ({ onCategoryChange, selectedIndex }): ReactElement => {
  const [open, setOpen] = useState(true)
  const categories: Category[] = useMemo(() => {
    const className = open ? 'sideBarIcon' : 'sideBarIconCollapsed'
    return [
      {
        name: 'Team Win %',
        icon: <FaChartPie className={className} size={30} />
      },
      {
        name: 'Kills',
        icon: <FaCrosshairs className={className} size={30} />
      },
      {
        name: 'Hero Picks',
        icon: <FaUserAlt className={className} size={30} />
      },
      {
        name: 'Ban Picks',
        icon: <FaBan className={className} size={30} />
      },
      {
        name: 'Item Win Rate',
        icon: <FaChartLine className={className} size={30} />
      },
      {
        name: 'Hero Win Rate',
        icon: <FaChartLine className={className} size={30} />
      },
      {
        name: 'Match History',
        icon: <FaHistory className={className} size={30} />
      }
    ]
  }, [open])
  return <div>
    <div className={open ? 'sideBarContainer' : 'sideBarContainerCollapsed'}>
      {categories.map((category, i) => (
        <div key={i} className='sideBarItem' onClick={() => onCategoryChange(i)} style={ selectedIndex === i ? { backgroundColor: 'gainsboro' } : {}}>
          {open && <p className='sideBarText'>{category.name}</p>}
          {category.icon}
        </div>
      ))}
      <div className='sideBarItem' onClick={() => setOpen((prev) => !prev)}>
        {open ? <FaArrowLeft className='sideBarLeftArrow' size={30} /> : <FaArrowRight className='sideBarRightArrow' size={30} />}
      </div>
    </div>
  </div>
}

export default CategorySideBar
