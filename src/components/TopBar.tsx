import React, { FC, ReactElement } from 'react'
import './TopBar.css'

interface TopBarProps {
  title: string
  children?: React.ReactNode
}

const TopBar: FC<TopBarProps> = ({ children, title }): ReactElement => {
  return (
    <div className='TopBar'>
      <h1 className='pageHeader'>{title}</h1>
      {children}
    </div>
  )
}

export default TopBar
