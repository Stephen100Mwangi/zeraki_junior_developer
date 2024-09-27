/* eslint-disable no-unused-vars */
import React from 'react'
import SideBar from './pages/SideBar'
import DashBoard from './pages/DashBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Schools from './pages/Schools'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' 
            element={

              <div className='flex flex-row justify-between bg-back max-sm:flex-col'>
                <div className="w-1/5 fixed max-sm:relative max-sm:flex max-sm:flex-row max-sm:w-full">
                  <SideBar />
                </div>
                <div className='w-4/5 ml-[20%] max-sm:w-full max-sm:ml-0 max-sm:mx-2'>
                  <DashBoard />
                </div>
              </div>
            }>
          </Route>
          <Route path='/schools' element={<Schools />}></Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
