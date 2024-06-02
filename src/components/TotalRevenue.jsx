/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { FaEye } from 'react-icons/fa6';
import { IoCloseCircleSharp } from 'react-icons/io5';

const TotalRevenue = () => {
  const [count,setCount] = useState(0);
  const [showTotal,setShowTotal] = useState(false);

  const [z_FinanceTotal,setZ_FinanceT] = useState(0);
  const [z_AnalyticsTotal,setZ_AnalyticsT] = useState(0);
  const [z_TimetableTotal,setZ_TimetableT] = useState(0);


  useEffect(()=>{
    fetch("http://localhost:8000/collections").then(response => {
      return response.json();
    }).then(data =>{
      console.log(data);
      let sum = 0;
      for (let x = 0; x < data.length; x++) {
        const element = data[x].amount;
        sum += element;
      }

      setCount(sum);

      
      const zerakiARevenue = data.filter(x => x.invoiceItem === "Zeraki Analytics");
      let zARevenue = 0;
      for (let a = 0; a < zerakiARevenue.length; a++) {
        const element = zerakiARevenue[a].amount;
        zARevenue += element;
        
      }
      setZ_AnalyticsT(zARevenue);

      const zerakiFRevenue = data.filter(x => x.invoiceItem === "Zeraki Finance");
      let zFRevenue = 0;
      for (let x = 0; x < zerakiFRevenue.length; x++) {
        const element = zerakiFRevenue[x];
        zFRevenue += element;
        console.log(zFRevenue);
        
      }

      setZ_FinanceT(zFRevenue);

      const zerakiTRevenue = data.filter(x => x.invoiceItem === "Zeraki Timetable");
      let zTRevenue = 0;
      for (let x = 0; x < zerakiTRevenue.length; x++) {
        const element = zerakiTRevenue [x];
        zTRevenue += element;
        console.log(zTRevenue);
        
      }

      setZ_TimetableT(zFRevenue);

      
      
    })

  })
  return (
    <div className='bg-back rounded-xl shadow-2xl border h-[40vh] p-6 flex flex-col space-y-3 justify-center items-center'>
      <div className='text-3xl font-bold'>Total Revenue</div>
      <div className='text-3xl font-mono'>{count}</div>
      <div onClick={()=>setShowTotal(!showTotal)} className='hover:bg-white hover:text-hover hover:outline p-3 cursor-pointer my-10 px-6 rounded-full flex flex-row items-center justify-center w-fit space-x-5 bg-hover text-white'>
          <p>View More</p>
          <div><FaEye /></div>
      </div>
      {
        showTotal && (

          <div className="flex flex-col space-y-3 rounded-xl p-4 bg-green-500 absolute left-28 bottom-14">
              <div onClick={()=>setShowTotal(!showTotal)} className='cursor-pointer flex justify-end p-2 text-white text-xl'><IoCloseCircleSharp /></div>
              <div className="font-semibold text-center text-xl">Total Revenue</div>
              <p className='text-white font-normal'>Zeraki Analytics: <span className='mx-4 text-base font-mono'>{z_AnalyticsTotal}</span></p>
              <p className='text-white font-normal'>Zeraki Finance: <span className='mx-4 text-base font-mono'>{z_FinanceTotal}</span></p>
              <p className='text-white font-normal'>Zeraki Timetable: <span className='mx-4 text-base font-mono'>{z_TimetableTotal}</span></p>
          </div>

        )
      }
      
    </div>
  )
}

export default TotalRevenue
