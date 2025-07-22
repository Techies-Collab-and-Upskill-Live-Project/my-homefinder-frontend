
export default function ProcessingPage () {
    return(
        <section className="h-screen">
            <div className="text-center gap-y-3">
                <h1 className="font-sans font-semibold text-xl">Processing your documents</h1>
                <p className="font-sans text-md font-medium text-[#1C1B1F] ">Your proof of ID is currently being reviewed, you will recieve your verified badge shortly.</p>
                {/*precious or whoever will edit it will add a spinner here */}
                <p className="text-[#1E1E1E] text-md font-sans mt-16">Thank you for your patience!</p>
            </div>
        </section>
    )
}