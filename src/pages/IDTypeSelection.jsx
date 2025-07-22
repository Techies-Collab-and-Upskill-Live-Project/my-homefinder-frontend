import React from "react";

export default function IDTypeSelection (){

    const IDtypes = [
        {
            id: "1",
            name: "Driver's License",
            image: '/images/DriverID.png'
        },
        {
            id: "2",
            name: "National ID card",
            image: '/images/NationalID.png'
        },
        {
            id: "3",
            name: "Passport",
            image: '/images/Passport.png'
        },
    ];

    return(
        <section className="h-screen">
            <div className="text-black mx-10">
                <h1 className="text-center text-3xl font-semibold font-sans">Verify Your Identity</h1>
                <h3 className="text-xl font-montserrat font-semibold mt-3">Select ID Type</h3>
                <h5 className="text-md font-montserrat font-normal mt-1">Which photo ID would you like to use?</h5>
                <div className="flex flex-col gap-y-6 mt-3">
                    {IDtypes.map((idType) => (
                        <button key={idType.id} className="hover:bg-gray-100 rounded-xl flex justify-between items-center px-3 py-2 bg-none border-1 border-gray-950 text-md font-sans">
                            {idType.name} 
                            <img src={idType.image} alt={idType.name} />
                        </button>
                    ))} 
                </div>
            </div>
        </section>
    )
}