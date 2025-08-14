
const decisionSection = () => {
  return (
    <div className="w-full bg-black py-10">
  <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
    {/* Card 1 */}
    <div className="bg-white rounded-xl shadow-md flex items-center justify-center h-[300px]">
      <img src="/path/to/trust.png" alt="Secure" className="h-24 w-24 object-contain" />
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-xl shadow-md flex items-center justify-center h-[300px]">
      <img src="/path/to/Reliable.png" alt="Certified" className="h-24 w-24 object-contain" />
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-xl shadow-md flex items-center justify-center h-[300px]">
      <img src="/path/to/FastResponse.png" alt="Time Efficient" className="h-24 w-24 object-contain" />
    </div>

    {/* Card 4 */}
    <div className="bg-white rounded-xl shadow-md flex items-center justify-center h-[300px]">
      <img src="/path/to/communication.png" alt="Support" className="h-24 w-24 object-contain" />
    </div>
  </div>
</div>

  )
}
export default decisionSection