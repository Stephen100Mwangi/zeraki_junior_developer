/* eslint-disable no-unused-vars */
import React from 'react'

const NavBar = () => {
  return (
    <div className='flex flex-row items-center justify-end p-6 space-x-5 max-sm:flex-col max-sm:space-y-5 max-sm:w-full max-sm:px-2 max-sm:text-right max-sm:items-end'>
        <div className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Home</div>
        <div className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Schools data</div>
        <div className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Invoices</div>
        <div className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Collections</div>
    </div>
  )
}

export default NavBar