import { useState } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import chatbot from "../../assets/icons/chatbot.gif";
import CardContainer from "../../components/CardContainer";
import AddPackageForm from "../../components/AddPackageForm";

const AddPackages = () => {
    return (
        <div className="h-screen overflow-hidden"> {/* Add this */}
            <div className="flex h-full"> {/* Add h-full */}
                <Sidebar role="admin" />
                <div className="flex-1 p-4 relative flex flex-col"> {/* Add flex flex-col */}
                    {/* Company Logo - top right */}
                    <img
                        src={logo}
                        alt="Company Logo"
                        className="absolute top-4 right-6 w-24 h-auto z-20"
                    />
                    <h1 className="text-5xl font-bold text-primary mb-6 mt-10 ml-6 drop-shadow-lg flex-shrink-0"> {/* Add flex-shrink-0 */}
                        Add New Package
                    </h1>
                    
                    {/* Add Package Form in Card Container */}
                    <div className="flex-1 overflow-hidden"> {/* Add this wrapper */}
                        <CardContainer>
                            <div className="col-span-full flex justify-center">
                                <AddPackageForm />
                            </div>
                        </CardContainer>
                    </div>
                    
                    {/* Chatbot icon at right bottom */}
                    <img
                        src={chatbot}
                        alt="Chatbot Logo"
                        className="fixed bottom-1 right-10 w-15 h-15 z-30 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddPackages;
