/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import ConfirmationModal from "../Confirmation";

const SchoolInvoices = () => {
  const [schools, setSchools] = useState([]);
  const [invoiceShown, setInvoiceShown] = useState([]);
  const [seeCreate, setSeeCreate] = useState(false);
  const [seeUpdate, setSeeUpdate] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // For Update
  const [school_Name, setSchoolName] = useState("");
  const [invoice_Date, setInvoiceDate] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState();
  const [invoiceItem, setInvoiceItem] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [invoiceStatus, setStatus] = useState();

  const newData = {
    school_Name,
    invoice_Date,
    invoiceDueDate,
    invoiceAmount,
    invoiceItem,
    invoiceNo,
    invoiceStatus,
  };

  // For new data
  const [SCHName, setSCHName] = useState("");
  const [INVDate, setINVDate] = useState("");
  const [INVDueDate, setINVDueDate] = useState("");
  const [INVAmount, setINVAmount] = useState(0);
  const [INVItem, setINVItem] = useState("");
  const [INVNo, setINVNo] = useState("");
  const [INVStatus, setINVStatus] = useState("");

  const inputData = {
    school: SCHName,
    invoiceDate: INVDate,
    dueDate: INVDueDate,
    amount: INVAmount,
    item: INVItem,
    invoiceNumber: INVNo,
    invoiceStatus: INVStatus,
  };

  useEffect(() => {
    fetch("http://localhost:8000/schools")
      .then((response) => {
        if (!response.ok) {
          console.log("Response NOT Found");
        } else {
          console.log("Response Found");
          return response.json();
        }
      })
      .then((data) => setSchools(data))
      .catch((error) => console.error("Error fetching schools:", error));
  }, []);

  const showInvoice = (schoolName) => {
    fetch(
      `http://localhost:8000/invoices?school=${encodeURIComponent(schoolName)}`
    )
      .then((response) => {
        if (!response.ok) {
          console.log("Response NOT Found");
        } else {
          console.log("Response Found");
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          console.log("No data found");
        } else {
          console.log(data);
          setInvoiceShown(data);
        }
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  };

  const updateInvoice = (no, school_name, item, updatedData) => {
    fetch(
      `http://localhost:8000/invoices?invoiceNumber=${no}?school=${school_name}?invoiceItem=${item}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log("Response NOT Found");
        } else {
          console.log("Response Found");
          return response.json();
        }
      })
      .then((data) => {
        setSchools([...schools, data]);
      });
  };

  const answerQuery = () => {
    return toast.error(
      "You do not have an invoice for this school. Please create one"
    );
  };

  const createPop = () => {
    setSeeCreate(!seeCreate);
    return toast.success("You are about to create an invoice");
  };

  const scrollPop = () => {
    return toast.success("Scroll down to view your invoice");
  };

  const addInvoice = (data) => {
    fetch(`http://localhost:8000/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Response not found");
          toast.error("An error occurred while inputting data");
        } else {
          toast.loading("Uploading to JSON Server.Please wait");
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          console.log("Failed to create an input");
          toast.error("Could not complete action");
        } else {
          toast.success("You successfully added a new invoice");
          showInvoice(data.school);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteInvoice = (invoiceId) => {
    fetch(`http://localhost:8000/invoices/${invoiceId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Failed to delete the invoice");
          throw new Error("Network response was not ok.");
        } else {
          toast.success("Invoice deleted successfully");
          // Update the state or re-fetch data if necessary
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle delete button click
  const handleDeleteClick = (invoiceId) => {
    setDeleteTarget(invoiceId);
    setIsModalOpen(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    if (deleteTarget) {
      deleteInvoice(deleteTarget);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      id="schoolInvoice"
      className="flex flex-col space-y-8 items-center justify-start"
    >
      <h1 className="text-center font-bold text-2xl border-b-2 pb-3">
        Invoices
      </h1>
      <div className="flex items-center justify-center">
        <img src="./invoice_.png" className="w-64" alt="" />
      </div>
      <div className="grid grid-cols-5 gap-10 items-center justify-start flex-wrap border-t-2 pt-10">
        {schools.map((item, index) => (
          <div
            onClick={() => {
              showInvoice(item.name);
              scrollPop();
            }}
            className="h-[120px] w-[200px] flex items-center justify-center font-medium hover:bg-hover text-center hover:text-white rounded-xl shadow-lg border-t-[1px] p-4 cursor-pointer"
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>

      <Toaster />

      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this invoice?"
      />

      <div className="invoice-details flex space-x-5">
        {invoiceShown.map((invoice, index) => (
          <div
            key={index}
            className="relative bg-white flex flex-row items-center justify-center space-x-16 text-green-500 rounded-2xl shadow-2xl w-fit p-6 max-sm:p-2 max-sm:flex-col max-sm:space-y-3"
          >
            <div className="bg-red-600 rounded-full shadow-lg size-6  flex items-center justify-center absolute top-2 right-2">
              <CgClose className="text-white" />
            </div>
            <div>
              <h2 className="font-bold mb-4">Invoice for {invoice.school}</h2>
              <p className="font-mono text-black">Amount: ${invoice.amount}</p>
              <p className="font-mono text-black">
                Date: {invoice.invoiceDate}
              </p>
              <p className="font-medium">Status: {invoice.invoiceStatus}</p>
              <img src="./found.png" className="h-32" alt="" />
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setSeeCreate(!seeCreate)}
                className="text-white bg-green-500 font-medium flex text-center items-center justify-center shadow-xl px-6 p-2 rounded-full"
              >
                Create Invoice
              </button>
              {/* <button className="text-white bg-hover font-medium flex text-center items-center justify-center shadow-xl px-6 p-2 rounded-full">
                Read Invoice
              </button> */}
              <button
                onClick={() => setSeeUpdate(!seeUpdate)}
                className="text-black outline font-medium flex text-center items-center justify-center shadow-xl px-6 p-2 rounded-full"
              >
                Update Invoice
              </button>
              <button
                onClick={() => handleDeleteClick(invoice.id)}
                className="text-white bg-red-600 font-medium flex text-center items-center justify-center shadow-xl px-6 p-2 rounded-full"
              >
                Delete Invoice
              </button>
            </div>
          </div>
        ))}

        {invoiceShown.length === 0 && (
          <div className="relative flex space-x-16 items-center justify-center space-y-3 bg-white text-red-500 rounded-2xl shadow-2xl w-fit p-6 max-sm:px-2 max-sm:flex-col max-sm:space-y-3 ">
            <div className="bg-red-600 rounded-full shadow-lg size-6  flex items-center justify-center absolute top-2 right-2">
              <CgClose className="text-white" />
            </div>
            <div className="flex flex-col space-y-4">
              <img src="./404.png" className="h-32" alt="" />
              <p className="text-red-600 font.bold">
                No invoice found for this resource
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => createPop()}
                className="text-white bg-green-500 font-medium flex text-center items-center justify-center shadow-xl px-6 p-2 rounded-full"
              >
                Create Invoice
              </button>
              <button
                onClick={() => answerQuery()}
                className="text-black outline font-medium flex text-center items-center justify-center shadow-xl px-6 p-2 rounded-full"
              >
                Query here
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-10 justify-start items-center w-full">
        {seeCreate && (
          <div className="create flex flex-col space-y-5 rounded-xl p-6 border w-[400px]">
            <div className="text-center text-xl font-bold">
              Create an invoice
            </div>

            <label htmlFor="schoolName">School Name</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="text"
              name="schoolName"
              id="schoolName"
              placeholder="Input your school"
              value={SCHName}
              onChange={(e) => setSCHName(e.target.value)}
            />

            <label htmlFor="invoiceDate">Invoice Date</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="date"
              name="invoiceDate"
              id="invoiceDate"
              placeholder="Invoice date"
              value={INVDate}
              onChange={(e) => setINVDate(e.target.value)}
            />

            <label htmlFor="dueDate">Due Date</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="date"
              name="dueDate"
              id="dueDate"
              placeholder="Due Date"
              value={INVDueDate}
              onChange={(e) => setINVDueDate(e.target.value)}
            />

            <label htmlFor="creationDate">Creation Date</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="datetime-local"
              name="creationDate"
              id="creationDate"
              placeholder="Creation Date"
            />

            <label htmlFor="invoiceAmount">Invoice Amount</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="number"
              name="invoiceAmount"
              id="invoiceAmount"
              placeholder="Invoice amount"
              value={INVAmount}
              onChange={(e) => setINVAmount(e.target.value)}
            />

            <label htmlFor="invoiceItem">Invoice Item</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="text"
              name="invoiceItem"
              id="invoiceItem"
              placeholder="Invoice Item"
              value={INVItem}
              onChange={(e) => setINVItem(e.target.value)}
            />

            <label htmlFor="invoiceNumber">Invoice Number</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"
              placeholder="Invoice Number"
              value={INVNo}
              onChange={(e) => setINVNo(e.target.value)}
            />

            <label htmlFor="amountPaid">Amount Paid</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="number"
              name="amountPaid"
              id="amountPaid"
              placeholder="Amount Paid"
            />

            <label htmlFor="balance">Balance</label>
            <input
              required
              className="px-6 p-2 outline outline-hover rounded-2xl"
              type="number"
              name="balance"
              id="balance"
              placeholder="Balance"
            />

            <label htmlFor="invoiceStatus">Invoice Status</label>
            <select
              required
              name="invoiceStatus"
              id="invoiceStatus"
              value={INVStatus}
              onChange={(e) => setINVStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>

            <button
              onClick={() => addInvoice(inputData)}
              className="bg-hover px-6 p-2 rounded-full shadow-xl flex items-center justify-center hover:outline-hover hover:outline text-white"
            >
              Add Invoice
            </button>
          </div>
        )}

        {seeUpdate && (
          <div className="flex flex-col space-y-5 rounded-xl p-6 border w-[400px]">
            <div className="text-center text-xl font-bold">
              Update an invoice
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="School Name" className="font-bold text-base">
                School Name
              </label>
              <input
                value={school_Name}
                onChange={(e) => setSchoolName(e.target.value)}
                className="px-6 p-2 outline outline-hover rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="Input your school"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="Invoice Date" className="font-bold text-base">
                Invoice Date
              </label>
              <input
                value={invoice_Date}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="px-6 p-2 outline outline-hover rounded-2xl"
                type="date"
                name=""
                id=""
                placeholder="Invoice date"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="Invoice Due Date" className="font-bold text-base">
                Invoice Due Date
              </label>
              <input
                value={invoiceDueDate}
                onChange={(e) => setInvoiceDueDate(e.target.value)}
                className="px-6 p-2 outline outline-hover rounded-2xl"
                type="date"
                name=""
                id=""
                placeholder="dueDate"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="Invoice Amount" className="font-bold text-base">
                Invoice Amount
              </label>
              <input
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
                className="px-6 p-2 outline outline-hover rounded-2xl"
                type="number"
                name=""
                id=""
                placeholder="Invoice amount"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="Invoice Item" className="font-bold text-base">
                Invoice Item
              </label>
              <input
                value={invoiceItem}
                onChange={(e) => setInvoiceItem(e.target.value)}
                className="px-6 p-2 outline outline-hover rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="Invoice Item"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="Invoice No" className="font-bold text-base">
                Invoice No
              </label>
              <input
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="px-6 p-2 outline outline-hover rounded-2xl"
                type="text"
                name=""
                id=""
                placeholder="Invoice Number"
              />
            </div>

            <select name="" id="">
              <option disabled value="Status">
                Invoice Status
              </option>
              <option value="pending" onChange={() => setStatus("Pending")}>
                Pending
              </option>
              <option value="paid" onChange={() => setStatus("Paid")}>
                Paid
              </option>
            </select>
            <button
              onClick={() =>
                updateInvoice(invoiceNo, school_Name, invoiceItem, newData)
              }
              className="bg-hover px-6 p-2 rounded-full shadow-xl flex items-center justify-center hover:outline-hover hover:outline text-white"
            >
              Update Invoice
            </button>
          </div>
        )}
      </div>

      <div className="readInvoice">{}</div>
    </div>
  );
};

export default SchoolInvoices;
