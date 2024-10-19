/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import CollectionCard from '../components/CollectionCard'
import SignUpsCard from '../components/SignUpsCard'
import TotalRevenue from '../components/TotalRevenue'
import BouncedCheques from '../components/BouncedCheques'
import ZerakiAnalytics from '../components/PIECHARTS/ZerakiAnalytics'
import ZerakiFinance from '../components/PIECHARTS/ZerakiFinance'
import ZerakiTimeTable from '../components/PIECHARTS/ZerakiTimeTable'
import ZerakiAnalyticsBar from '../components/BARGRAPHS/ZerakiAnalyticsBar'
import ZerakiFinanceBar from '../components/BARGRAPHS/ZerakiFinanceBar'
import ZerakiTimetableBar from '../components/BARGRAPHS/ZerakiTimeTableBar'
import { MdCancel } from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast';

const DashBoard = () => {

  const [user_data, setData] = useState([]);
  const [collectInvoice, setCollectInvoice] = useState(false);

  const [name_SchoolInvoice, setName_SchoolInvoice] = useState("");
  // const [paid_SchoolInvoice, setPaid_SchoolInvoice] = useState(0);
  const [InvoiceNumber_School, setInvoiceNumber_School] = useState("");

   const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/invoices?_sort=invoiceDate&_order=desc`)
      .then(response => {
        if (!response.ok) {
          console.log("No response found");
        } else {
          console.log("Response found");
          return response.json();
        }
      })
      .then(data => {
        setData(data);
        console.log(user_data);
      })
      .catch(error => console.error("Error fetching invoices:", error));
  }, [user_data]);

  const updateInvoices = () => {
    fetch(`${apiUrl}/invoices?invoiceNumber=${InvoiceNumber_School}&school=${name_SchoolInvoice}`)
      .then(response => {
        if (!response.ok) {
          console.log("No response found");
          toast.error("Invoice NOT Found");
        } else {
          console.log("Response found");
          return response.json();
        }
      })
      .then(data => {
        if (data.length > 0) {
          const invoice = data[0];
          fetch(`${apiUrl}/invoices/${invoice.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              { invoiceStatus: 'paid', balance: 0 }
            ),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error updating invoice');
              }
              return response.json();
            })
            .then(updatedInvoice => {
              console.log(updatedInvoice);
              setData(user_data.map(item => (item.id === updatedInvoice.id ? updatedInvoice : item)));
              toast.success("Invoice updated to paid");
            })
            .catch(error => {
              console.error("Error updating invoice:", error);
              toast.error("Failed to update invoice");
            });
        } else {
          toast.error("Invoice not found");
        }
      })
      .catch(error => console.error("Error fetching invoice:", error));
  };

  return (
    <div className='flex flex-col space-y-10 w-full min-h-screen'>
      <Toaster />
      <div id="topCard" className="flex flex-col my-12 space-y-8 justify-center items-center max-sm:px-2 max-sm:items-center max-sm:justify-center">
        <h1 className='text-center text-2xl font-bold'>Top Card Metrics</h1>
        <div className='grid grid-cols-2 gap-10 p-8 w-full max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:px-2'>
          <CollectionCard />
          <SignUpsCard />
          <TotalRevenue />
          <BouncedCheques />
        </div>
      </div>

      <div id="visualCard" className="flex flex-col my-12 space-y-8 justify-center items-center">
        <h1 className='text-center text-2xl font-bold'>Pie Charts</h1>
        <div className='flex items-center justify-between mx-8 my-12 max-sm:flex-col max-sm:space-y-24'>
          <ZerakiAnalytics />
          <ZerakiTimeTable />
          <ZerakiFinance />
        </div>
      </div>

      <div id="signUp" className="flex flex-col my-12 space-y-8 justify-center items-center">
        <h1 className='text-center text-2xl font-bold'>Bar Graphs</h1>
        <div className='flex flex-col space-y-16 items-center justify-between mx-8 my-12 max-sm:space-y-32'>
          <ZerakiAnalyticsBar />
          <ZerakiTimetableBar />
          <ZerakiFinanceBar />
        </div>
      </div>

      <div id="invoices" className="flex flex-col my-24 py-8 space-y-8 justify-center items-center max-sm:mb-48 max-sm:w-fit">
        <div className='flex flex-col space-y-16 items-center justify-between mx-8 my-12'>
          <h1 className='text-center text-2xl font-bold'>Upcoming Invoices</h1>
        </div>
        <div className='flex flex-col space-y-5 my-8 rounded-lg shadow-2xl p-8 mb-20'>
          <div className='flex justify-start items-center gap-8 max-sm:gap-5'>
            <div className='text-xl font-bold w-[280px] max-sm:text-xs max-sm:w-[80px]'>School Name</div>
            <div className='text-xl font-bold w-[100px] max-sm:text-xs max-sm:w-[30px]'>Due Amount</div>
            <div className='text-xl font-bold w-[150px] max-sm:text-xs max-sm:w-[50px]'>Invoice No</div>
            <div className='text-xl font-bold w-[150px] max-sm:text-xs max-sm:w-[50px]'>Due Date</div>
          </div>

          {
            user_data.map((item, index) =>
              <div key={index} className='flex gap-8 justify-start items-center'>
                <div className='w-[280px] max-sm:w-[80px]'>{item.school}</div>
                <div className='w-[100px] font-light max-sm:w-[30px]'>{item.balance}</div>
                <div className='w-[150px] font-light max-sm:w-[50px]'>{item.invoiceNumber}</div>
                <div className='w-[150px] font-mono max-sm:w-[50px]'>{item.dueDate}</div>
                <button onClick={() => setCollectInvoice(!collectInvoice)} className='text-hover text-base font-medium px-4 rounded-full hover:text-green-500 hover:shadow-xl bg-white p-2'>Collect Invoice</button>
              </div>
            )
          }
        </div>
        {
          collectInvoice && (
            <div className="flex bg-hover absolute items-center justify-center flex-col space-y-10 rounded-lg p-4 shadow-2xl py-8 my-8">
              <div className="w-full flex justify-end items-baseline px-4"><MdCancel onClick={() => setCollectInvoice(!collectInvoice)} className='text-white cursor-pointer text-2xl'/></div>
              <h1 className='text-xl uppercase text-white font-medium'>Keep <span className='text-green-500'>track</span> of your invoices</h1>
              <input value={name_SchoolInvoice} onChange={(e) => setName_SchoolInvoice(e.target.value)} className='px-6 p-2 outline outline-hover rounded-lg' type="text" placeholder='Name of the school'/>
              {/* <input value={paid_SchoolInvoice} onChange={(e) => setPaid_SchoolInvoice(e.target.value)} className='px-6 p-2 outline outline-hover rounded-lg' type="number" placeholder='Invoice amount' /> */}
              <input value={InvoiceNumber_School} onChange={(e) => setInvoiceNumber_School(e.target.value)} className='px-6 p-2 outline outline-hover rounded-lg' type="text" placeholder='Invoice number' />
              <button onClick={() => updateInvoices()} className="flex items-center w-fit px-6 p-2 rounded-full text-white shadow-2xl outline">
                Collect Invoice
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default DashBoard;

