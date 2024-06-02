/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";

const SchoolCollections = () => {

  const [collectionsShown,setCollectionsShown] = useState([]);

  const showCollections = ()=>{
    fetch(`http://localhost:8000/collections`).then(response => {
      if (!response.ok) {
        console.log("Response not found")
      }else{
        console.log("Response found");
        return response.json();
      }
    }).then(data => {
      if (!data) {
        console.log("No data found");
      }else{
        console.log(data);
        setCollectionsShown(data);

      }
    })
  }


  const updateCollections = async (targetID) => {
    try {
      const response = await fetch(`http://localhost:8000/collections?id=${encodeURIComponent(targetID)}`);
      if (!response.ok) {
        console.log('Response not found');
        return;
      }
      const data = await response.json();
      if (!data) {
        console.log('No data found');
        return;
      }
      console.log(data);
      const dataUpdate = data.find(x => x.id === targetID);
      if (!dataUpdate) {
        console.log('No such data found');
        return;
      }
      const newDataUpdated = { ...dataUpdate, invoiceStatus: 'bounced' };
      setCollectionsShown(prevCollections => {
        const updatedCollections = prevCollections.map(collection =>
          collection.id === targetID ? newDataUpdated : collection
        );
        return updatedCollections;
      });
    } catch (error) {
      console.error('Error updating collection:', error);
    }
  };



  return (
    <div id="collections" className="flex flex-col justify-center items-center space-y-8 my-12">
    <h1 className='border-b-2 pb-3 text-center text-2xl font-bold'>Collections</h1>
    <div className="flex items-center justify-center">
      <img src="src/assets/images/invoice.png" className='w-64' alt="" />
    </div>
    <div>
      <p className='text-2xl capitalize font-bold text-center'>Keep your <span className='text-hover'>records</span> close to yourself</p>
    </div>
    <div onClick={showCollections} className='p-3 cursor-pointer my-10 px-6 rounded-full flex flex-row items-center justify-center w-fit space-x-5 bg-hover text-white'>
      <p>View More</p>
      <div><FaEye /></div>
    </div>
    <div className='flex flex-col space-y-4'>
      {
        collectionsShown.map((collection,index) => (
          <div key={index} className='flex space-x-5 justify-start items-center'>
            <div>{collection.id}</div>
            <div className='text-lg font-medium w-[300px]'>{collection.name}</div>
            <div>{collection.invoiceNumber}</div>
            <div>{collection.collectionNumber}</div>
            <div className='font-mono'>{collection.collectionDate}</div>
            <div className={collection.invoiceStatus === "valid"? "text-green-500": "text-red-500"}>{collection.invoiceStatus}</div>
            <div className='text-base font-light'>{collection.amount}</div>
            <button onClick={()=>updateCollections(collection.id)} className='p-2 px-6 outline text-hover hover:text-red-500 hover:outline-red-500 outline-hover rounded-full shadow-2xl'>Update status</button>
          </div>

        ))
      }

    </div>


  </div>

  )
}

export default SchoolCollections




