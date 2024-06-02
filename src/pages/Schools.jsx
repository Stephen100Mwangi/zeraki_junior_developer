/* eslint-disable no-unused-vars */
import React from 'react'
import SchoolCollections from '../components/schoolModules/SchoolCollections';
import School_Data from '../components/schoolModules/School_Data';
import SchoolInvoices from '../components/schoolModules/School_Invoices';
import NavBar from '../components/NavBar';


const Schools = () => {
  
  return (
    <div className='p-8 flex flex-col space-y-20'>
      <NavBar />
      <School_Data />
      <SchoolInvoices />
      <SchoolCollections />
    </div>
  )
}

export default Schools
