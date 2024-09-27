/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa6';
import { IoCloseCircleSharp } from "react-icons/io5";


const SignUpsCard = () => {
  const [count,setCount] = useState(0);
  const [showSide,setShowSide] = useState(false);

  const [z_Finance,setZ_Finance] = useState(0);
  const [z_Analytics,setZ_Analytics] = useState(0);
  const [z_Timetable,setZ_Timetable] = useState(0);


  useEffect(() =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/schools`).then(response =>{
      return response.json();
    }).then(data =>{
      console.log(data);
      setCount(data.length);
      const zerakiA = data.filter(x => x.product === "Zeraki Analytics").length;
      const zerakiF = data.filter(x => x.product === "Zeraki Finance").length;
      const zerakiT = data.filter(x => x.product === "Zeraki Timetable").length;

      setZ_Analytics(zerakiA);
      setZ_Finance(zerakiF);
      setZ_Timetable(zerakiT);
    })
  })
  return (
    <div className='bg-back rounded-xl shadow-2xl border h-[40vh] p-6 flex flex-col space-y-3 justify-center items-center'>
      <div className='text-3xl font-bold'>Schools signed</div>
      <div className='text-3xl font-mono'>{count}</div>
      <div onClick={()=>setShowSide(!showSide)} className='hover:bg-white hover:text-hover hover:outline p-3 cursor-pointer my-10 px-6 rounded-full flex flex-row items-center justify-center w-fit space-x-5 bg-hover text-white'>
          <p>View More</p>
          <div><FaEye /></div>
      </div>

      {
        showSide && (

          <div className="flex flex-col space-y-3 rounded-xl p-4 bg-green-500 absolute right-8 top-14">
              <div onClick={()=>setShowSide(!showSide)} className='flex justify-end p-2 text-white text-xl'><IoCloseCircleSharp /></div>
              <div className="font-semibold text-center text-xl">Schools signed</div>
              <p className='text-white font-normal'>Zeraki Analytics: <span className='mx-4 text-base font-mono'>{z_Analytics}</span></p>
              <p className='text-white font-normal'>Zeraki Finance: <span className='mx-4 text-base font-mono'>{z_Finance}</span></p>
              <p className='text-white font-normal'>Zeraki Timetable: <span className='mx-4 text-base font-mono'>{z_Timetable}</span></p>
          </div>

        )
      }

      
    </div>
  )
}

export default SignUpsCard
