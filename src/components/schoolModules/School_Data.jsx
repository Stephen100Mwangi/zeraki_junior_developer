/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BiArrowToRight } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';

const School_Data = () => {

    const [schools,setSchools] = useState([]);
    const [viewedSchool,setViewSchool] = useState([]);
    const [seeSchool,setSeeSchool] = useState(false);


    useEffect(()=>{
        fetch("http://localhost:8000/schools").then(response => {
          if (!response.ok) {
            console.log("Response NOT Found")
          }else{
            console.log("Response found");
            return response.json();
          }
        }).then(data =>{
          setSchools(data);
        })
      },[]);

      const viewSchool = (index) => {
        const school_ToView = schools.filter(x => x.id == index+1);
        if (school_ToView) {
          console.log(school_ToView);
          
        }
        setViewSchool(school_ToView)
        setSeeSchool(true);
      }
      
  return (
    <div id='schoolData' className="flex flex-row max-md:flex-col max-sm:space-y-10">
        <div id='schools' className="w-1/2 flex flex-col space-y-8 items-center justify-start max-sm:w-full">
          <div className="flex flex-row space-x-5 justify-between items-center w-full border-b-2 p-2">
            <h2 className='font-bold text-xl'>Name of School</h2>
            <h2>Take Action</h2>
          </div>
          <div className='flex flex-col space-y-5 items-center justify-start h-screen overflow-scroll'>
            {
              schools.map((item,index) => 
                  <div className='flex justify-between items-center w-full' key={index}>
                    <div className="flex justify-center items-center font-mono max-sm:text-lg">{item.name}</div>
                    <div onClick={()=>viewSchool(index)} onDoubleClick={()=>setSeeSchool(!seeSchool)} className='cursor-pointer font-medium hover:bg-green-500 hover:text-white flex p-2 px-6 rounded-full bg-white shadow-2xl items-center justify-center space-x-5'>
                      <p>View More</p>
                      <div><BiArrowToRight /></div>
                    </div>
                  </div>)
            }

          </div>
          
 
          {
            seeSchool && (
              <div className="flex flex-col space-y-4 absolute right-5 top-20">
              {
                viewedSchool.map((school,index) => 
                  <div key={index} className='z-50 bg-hover text-white p-5 rounded-lg shadow-2xl max-sm:p-3'>
                    <div className="flex justify-end items-center text-xl text-white cursor-pointer" onClick={()=>setSeeSchool(!seeSchool)}><MdCancel /></div>
                    <div className="bold text-xl text-center text-green-500 mb-5">{school.name}</div>
                    <div className="flex space-x-4">
                      <div className="w-[200px] font-bold text-lg">School Name</div>
                      <div className="w-[200px]">{school.name}</div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-[200px] font-bold text-lg">County</div>
                      <div className="w-[200px]">{school.county}</div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-[200px] font-bold text-lg">School Type</div>
                      <div className="w-[200px]">{school.type}</div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-[200px] font-bold text-lg">Zeraki Product</div>
                      <div className="w-[200px]">{school.product}</div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-[200px] font-bold text-lg">Registration date</div>
                      <div className="w-[200px] font-mono">{school.registrationDate}</div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-[200px] font-bold text-lg">Contact</div>
                      <div className="w-[200px]">{school.contact}</div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-[200px] font-bold text-lg">Balance</div>
                      <div className="w-[200px] font-mono">${school.balance}</div>
                    </div>
                  </div>
                )
              }
            </div>
            )
          }
        </div>
        <div className="w-1/2 flex items-center justify-center max-sm:w-full">
            <img src="public/segment.png" className='w-[400px] scale-125 z-20' alt="" />
        </div>

    </div>
  )
}

export default School_Data
