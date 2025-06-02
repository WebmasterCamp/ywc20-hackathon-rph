import React from 'react'
import './MainCardBase.css';

const MainCardBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ghost-near-me-search-card flex justify-center items-center">
      <div className="py-[78px] w-[80%]">
        {children}
      </div>
    </div>
  )
}

export default MainCardBase