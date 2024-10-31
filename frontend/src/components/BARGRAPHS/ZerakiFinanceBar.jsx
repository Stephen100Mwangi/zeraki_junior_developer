/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS , CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(Tooltip, Legend, BarElement, Title, LinearScale, CategoryScale );


const ZerakiFinanceBar = () => {

  const [primary_Count,setPCount] = useState(40);
  const [secondary_Count,setSCount] = useState(50);
  const [IGCSE_Count,setIGCount] = useState(67)

  useEffect(() => {
    try {
      fetch("http://localhost:8000/schools",{method:"GET"}).then(response =>{
        if (!response) {
          console.error("No response fetched")
        }
        return response.json();

      }).then(data => {
        console.log(data);
        const primaryCount = data.filter(x => x.type === "Primary" && x.product === "Zeraki Finance").length;
        const secondaryCount = data.filter(x => x.type === "Secondary" && x.product === "Zeraki Finance").length;
        const IGCSECount = data.filter(x => x.type === "IGCSE" && x.product === "Zeraki Finance").length;

        setIGCount(IGCSECount);
        setPCount(primaryCount);
        setSCount(secondaryCount);

      })
    } catch (error) {
      console.log(error);
      
    }
  
  }, [])


  const data = {
    labels: ["Primary", "Secondary", "IGCSE"],
    datasets: [{
      barPercentage: 0.5,
      label: 'Schools enrolled',
      maxBarThickness: 50,
      minBarLength: 10,
      barHeight: 45,
      data: [primary_Count, secondary_Count, IGCSE_Count],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Red
        'rgba(54, 162, 235, 0.6)', // Blue
        'rgba(255, 206, 86, 0.6)' // Yellow
      ]
    }]
};


  const options = {
    responsive: true,
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
        position: 'bottom'
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Schools type'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      }
    }
  };

  
  return (
    <div className='flex flex-col space-y-5 items-center justify-center max-sm:w-[350px] max-sm:px-1'>
      <div className="text-base-font-medium">Zeraki Finances</div>
      <Bar className='h-[400px]' data={data} options={options}></Bar>
    </div>
  )
}

export default ZerakiFinanceBar
