/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
const CollectionCard = () => {
  const [count,setCount] = useState(0);
  useEffect(()=>{
    fetch("http://localhost:8000/collections").then(response => {
      return response.json()
    }).then((data)=>{
      setCount(data.length);
    })

  },[]);

  return (
    <div className='bg-back rounded-xl shadow-2xl border h-[40vh] p-6 flex flex-col space-y-3 justify-center items-center max-sm:px-2 max-sm:min-h-fit max-sm:h-64'>
      <div className='text-3xl font-bold'>Collected Cards</div>
      <div className='text-3xl font-mono'>{count}</div>
      
    </div>
  )
}

export default CollectionCard
