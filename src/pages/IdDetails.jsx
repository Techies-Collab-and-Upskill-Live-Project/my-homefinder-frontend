import { UploadSimple } from "@phosphor-icons/react";
import { useRef, useState } from "react"
export default function IdDetails() {
    const fileInputRef = useRef(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current.click()
    };
    const handleFileChange = () => {
        const file = event.target.files[0];
        if (file) {
            //to handlle the file upload
        }
    }
    const handleSumbit = () => {
        setIsSaving(!isSaving)
    }
    return(
        <section className="bg-none h-screen">
            <form className="mx-24 space-y-2" onSubmit={handleSumbit}>
               <div className="flex flex-col">
                    <label htmlFor="IdNum" className="font-sans text-md font-medium">ID Number</label>
                    <input type="text" className="w-full border-1 border-gray-800 outline-1 rounded-md mt-1 h-10"  />
               </div>
               <div className="flex flex-col">
                    <label htmlFor="BVN" className="font-sans text-md font-medium">BVN</label>
                    <input type="text" className="w-full border-1 border-gray-800 outline-1 rounded-md mt-1 h-10"  />
               </div>
                <div className="flex flex-col items-center text-gray-950 mt-6">
                    <h2 className="font-sans text-md font-medium">Please upload a photo</h2>
                    <p className="italic text-sm mt-1">Note: Post a clear picture because it will be rejected if unclear</p>
                    <button type="button" onClick={handleButtonClick} className="mt-3 rounded-md w-[50%] border-1 flex justify-center items-center gap-2 px-4 py-2 cursor-pointer">
                        <UploadSimple />
                        <span className="font-semibold tracking-wide">Upload</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden" 
                    />
                    <button type="submit" className={`w-[50%] ${isSaving ? "bg-green-400": "bg-[#0D7B0D]"} rounded-md px-2 py-3 text-white mt-3 font-semibold tracking-wide`}>{isSaving ? "Submiting...." : "Submit"}</button>
                </div>
                
               
            </form>
            
        </section>
    )
}