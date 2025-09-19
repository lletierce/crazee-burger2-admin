import React from 'react'
import { useApp } from '../../context/AppContext';
import AddProductForm from '../AddProductForm';

export default function LateralLeftPanel() {

  const { setIsLateralLeftPanelOpen } = useApp();


  const handleClickHidePanel = () => {
    setIsLateralLeftPanelOpen(false)
    // console.log("handleClickHidePanel")
  }

  return (
    <div className="bg-purple-700 absolute top-[8vh]  md:top-0 left-0 size-full z-10">
      <div className="bg-yellow-400 h-[10vh] max-h-[60px] flex items-center flex-row pl-4">
        <button onClick={handleClickHidePanel} className='cursor-pointer'>X</button>
      </div>
      <div className='m-20'>
        <AddProductForm />
      </div>
    </div>
  )
}
