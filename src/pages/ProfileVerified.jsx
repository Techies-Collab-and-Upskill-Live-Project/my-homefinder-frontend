import { CheckCircle } from "@phosphor-icons/react"

export default function ProfileVerified () {
    return(
        <section className="h-screen flex flex-col items-center">
            
                <CheckCircle size={200} weight="fill" color="white" style={{fill: "#0D7B0D"}} />
                <h2 className="text-green-800 font-sans font-bold text-4xl">CONGRATULATIONS</h2>
                <p className="text-black font-medium font-sans mt-6">Your account has been fully successfully </p>
                <button className="bg-green-700 text-lg font-semibold mt-12 text-white w-[50%] rounded-xl py-3">Continue</button>
           
        </section>
    )
}