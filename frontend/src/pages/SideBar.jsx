/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DropDown from '../components/DropDown'
import { MdDashboardCustomize } from "react-icons/md";
import Option from '../components/Option';
import SubOption from '../components/SubOption';
import { GiArchiveRegister } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
import { GiCroissantsPupil } from "react-icons/gi";
import { FaArrowsToCircle } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GiIncomingRocket } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import { GiCardAceDiamonds } from "react-icons/gi";
import { IoAnalytics } from "react-icons/io5";
import { FaCoins } from "react-icons/fa6";
import { IoCalendarNumber } from "react-icons/io5";

const SideBar = () => {
    const [toggle,setToggle] = useState(false);
    const [cardToggle,setCardToggle] = useState(true);
    const [visualizeToggle,setVisualizeToggle] = useState(false);
    const [signToggle,setSignToggle] = useState(false);
    const [invoiceToggle,setInvoiceToggle] = useState(false);

    const toggleAll = ()=>{
        setToggle(!toggle);
        setCardToggle(false);
        setVisualizeToggle(false);
        setSignToggle(false);
        setInvoiceToggle(false);
    }

  return (
    <div className='sidebar pt-8 flex flex-col space-y-10 min-h-screen bg-hover w-full overflow-auto max-sm:h-fit'>
        <div id='logo' className="flex items-center justify-start text-white p-3">
                <DropDown title="SmartPupil" icon={<GiCroissantsPupil className='rotate-45 text-3xl'/>} />
        </div>
        <Link to={"/"} className="flex flex-col space-y-6">
            <div className="flex items-center justify-start bg-back text-hover p-3 cursor-pointer" onClick={toggleAll}>
                <DropDown title="DashBoard" icon={<MdDashboardCustomize />} />
            </div>
            
                <div className="flex flex-col space-y-4  pl-4 justify-start">
                    {toggle && 
                        <div onClick={() => setCardToggle(!cardToggle)}>
                            <Option text="Top Card Metrics"  icon={<GiCardAceDiamonds />} />
                        </div>}

                    {cardToggle && toggle &&
                    <div className="topCard flex flex-col space-y-2 pl-8">
                        <Link to="#topCard">
                            <SubOption to='#visualCard' text="Collections" icon={<FaArrowsToCircle />} ></SubOption>
                        </Link>
                        <Link to="#topCard">
                            <SubOption text="SignUps" icon={<GiArchiveRegister />}></SubOption>
                        </Link>
                        <Link to="#topCard">
                            <SubOption text="Total Revenue" icon={<GiReceiveMoney />}></SubOption>
                        </Link>
                        <a href='#topCard'>
                            <SubOption text="Bounced Checks" icon={<FaMoneyBillTransfer />}></SubOption>
                        </a>
                    </div>}

                    {toggle && 
                        <div onClick={()=>setVisualizeToggle(!visualizeToggle)}>
                            <Option text="Target Visualizations" icon={<TbTargetArrow />} />
                        </div>}
                    {visualizeToggle && toggle &&
                    <div className="topCard flex flex-col space-y-2 pl-8">
                        <SubOption text="Zeraki Analytics" icon={<IoAnalytics />}></SubOption>
                        <SubOption text="Zeraki Finance" icon={<FaCoins />}></SubOption>
                        <SubOption text="Zeraki Timetable" icon={<IoCalendarNumber />}></SubOption>
                    </div>}

                    {toggle && 
                        <div onClick={() => setSignToggle(!signToggle)}>
                            <Option text="Sign up Invoices" icon={<GiArchiveRegister />} />
                        </div>}

                    {signToggle && toggle &&
                    <div className="topCard flex flex-col space-y-2 pl-8">
                        <SubOption text="Zeraki Analytics" icon={<IoAnalytics />}></SubOption>
                        <SubOption text="Zeraki Finance" icon={<FaCoins />}></SubOption>
                        <SubOption text="Zeraki Timetable" icon={<IoCalendarNumber />}></SubOption>
                    </div>}

                    {toggle &&
                        <div onClick={() => setInvoiceToggle(!invoiceToggle)}>
                            <Option text="Upcoming Invoices" icon={<FaMoneyBillTransfer />} />
                        </div>}      
                    {invoiceToggle && toggle &&
                    <div className="topCard flex flex-col space-y-2 pl-8">
                        <SubOption text="Upcoming Invoices" icon={<GiIncomingRocket />} ></SubOption>
                    </div>}
                </div>
            
        </Link>
        <Link to={"/schools"} className="flex flex-col space-y-6">
            <div className="flex items-center justify-start text-white border-b-[1px] border-back p-3">
                <DropDown title="Schools" icon={<IoSchoolSharp />} />
            </div>
        </Link>
      
    </div>
  )
}

export default SideBar
