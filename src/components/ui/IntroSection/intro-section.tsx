'use client'
import React, { useState } from "react";
import { image_url } from "../../../assets/images";
import LoginDetailModal from "../../modals/login-page-detail";
import { IntroImg, Logo } from "../Images/images";

// TypeScript types for props and state.
interface IntroSectionProps { }

const IntroSection: React.FC<IntroSectionProps> = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = (): void => {
        setOpen(true);
    };
    const handleClose = (): void => {
        setOpen(false);
    };
    return (
        <div className="flex flex-col justify-center items-center p-4 md:mt-[30%] lg:mt-[20%] xl:mt-0">
            <p className="mb-4 xl:ml-52">
            <Logo />
            </p>
            <p className="p-4 font-xl font-bold mb-10 ml-4 xl:ml-52">Innovating Stakeholder Management Solution</p>
            <p className="p-4 ml-4 xl:ml-40">Captrii is a cutting-edge Stakeholder Manager platform, revolutionising how organisations manage stakeholders.</p>

            <div onClick={handleClickOpen} className="cursor-pointer bg-gray-300 text-white p-3 rounded z-50 border">
                What is this page?
            </div>

            <p className="w-full ml-[20%] xl:ml-80 -mt-[5%]">
               <IntroImg />
            </p>
            <LoginDetailModal open={open} handleClose={handleClose} />
        </div>
    );
}

export default IntroSection;