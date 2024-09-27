/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ZerakiTimeTable = () => {
  const [enrolled,setEnrolled] = useState(50);
  const [target,setTarget] = useState(120);
  

  useEffect(() => {
    fetch("http://localhost:8000/zerakiTimetable").then(response =>{
      if (!response) {
        console.log("Response NOT found");
      }
      return response.json();
    }).then(data => {
      console.log(data);
      setEnrolled(data[0].enrolled);
      setTarget(data[0].target);
    })
  }, []);

  const data = {
    labels: ["Enrolled", "Target"],
    datasets: [{
      label: "Zeraki Analytics",
      data: [enrolled,target],  // Update this with actual dynamic data if available
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"], // Adjusting colors for better visualization
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== undefined) {
              label += context.raw.toFixed(2);
            }
            return label;
          }
        }
      },
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <div className='flex flex-col space-y-5 items-center justify-center'>
      <div className="text-base-font-medium">Zeraki Timetables</div>
      <Pie
        data={data}
        height={400}
        options={options}
      ></Pie>
    </div>
  );
};

export default ZerakiTimeTable;


