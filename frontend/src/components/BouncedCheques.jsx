/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

const BouncedCheques = () => {
  const [count,setCount] = useState(0);

  useEffect(()=>{
     const apiUrl = import.meta.env.VITE_API_URL;
    

    fetch(`${apiUrl}/bouncedCheques`,{method:"GET"}).then(response =>{
      if (!response) {
        console.log("No response found");
      }else{
        const myCount = response.json();
        setCount(myCount.length)
        console.log(response.json());
        
        return response.json();
      }
    }).then(data => {
      setCount(data.length)
    })
  })
  return (
    <div className='bg-back rounded-xl flex justify-center items-center flex-col space-y-3 shadow-2xl border h-[40vh] p-6'>
        <div className='text-3xl font-bold'>Bounced Cheques</div>
        <div className='text-3xl font-mono'>{count}</div>
    </div>
  )
}

export default BouncedCheques
