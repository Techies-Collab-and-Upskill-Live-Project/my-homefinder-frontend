import trust from '../assets/trust.png';
import Reliable from '../assets/Reliable.png';
import FastResponse from '../assets/FastResponse.png';
import communication from '../assets/Communication.jpg';

const SubSection = () => {
  return (
    <div className="w-full bg-white py-16 mt-26 flex flex-col items-center">
  <h2 className="text-center text-lg sm:text-2xl font-medium mb-12 px-4">
    Why Choose MyHomeFinder?
  </h2>

  <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
    
    {/* Card 1 */}
    <div className="bg-white rounded-xl shadow-md flex flex-col items-center text-center p-6 h-[220px]">
      <img src={trust} alt="Secure" className="h-24 w-24 object-contain mb-4" />
      <p className="text-sm text-gray-700">
        All photos, documents, and IDs are verified to prevent scams. Trust is everything in rentals.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-xl shadow-md flex flex-col items-center text-center p-6 h-[220px]">
      <img src={Reliable} alt="Certified" className="h-24 w-24 object-contain mb-4" />
      <p className="text-sm text-gray-700">
        We ensure our listings are reliable with up-to-date information from trusted sources.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-xl shadow-md flex flex-col items-center text-center p-6 h-[220px]">
      <img src={FastResponse} alt="Time Efficient" className="h-24 w-24 object-contain mb-4" />
      <p className="text-sm text-gray-700">
        Get fast responses from landlords and agents to secure your desired property quickly.
      </p>
    </div>

    {/* Card 4 */}
    <div className="bg-white rounded-xl shadow-md flex flex-col items-center text-center p-6 h-[220px]">
      <img src={communication} alt="Support" className="h-24 w-24 object-contain mb-4" />
      <p className="text-sm text-gray-700">
        We prioritize transparent communication between renters and property owners.
      </p>
    </div>

  </div>
</div>
  );
}

export default SubSection;
