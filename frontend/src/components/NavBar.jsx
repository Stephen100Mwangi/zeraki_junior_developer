/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex flex-row items-center justify-end p-6 space-x-5 max-sm:flex-col max-sm:space-y-5 max-sm:w-full max-sm:px-2 max-sm:text-right max-sm:items-end'>
        <Link to='/' className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Home</Link>
        <Link to='#schoolData' className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Schools data</Link>
        <Link to='#schoolCollection' className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Collections</Link>
        <Link to='#schoolInvoice' className='hover:text-green-500 text-base font-medium cursor-pointer max-sm:text-base max-sm:text-right'>Invoices</Link>
    </div>
  )
}

export default NavBar