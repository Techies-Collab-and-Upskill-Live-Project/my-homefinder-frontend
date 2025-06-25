// import Navbarlogo from "../assets/images/Navbarlogo.svg";
import { PhoneIcon, EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react";

const FooterBrandContact = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {/* <img src={Navbarlogo} alt="MyHomeFinderLogo" className="h-8 w-auto" /> */}
        <span className="text-2xl font-bold text-green-600">MyHomeFinder</span>
      </div>
      <div className="text-sm flex items-start space-x-2">
        <MapPinIcon size={20} weight="bold" />
        <span>5123 Market St., #22B, Charlottesville, California 44635</span>
      </div>
      <p className="text-sm flex items-center space-x-2">
        <PhoneIcon size={20} weight="bold" />
        <a href="tel:+2344345464356" className="hover:text-green-600">
          434-546-4356
        </a>
      </p>
      <p className="text-sm flex items-center space-x-2">
        <EnvelopeSimpleIcon size={20} weight="bold" />
        <a href="mailto:contact@lift.agency" className="hover:text-green-600">
          contact@myhomefinder.com
        </a>
      </p>
    </div>
  );
};

export default FooterBrandContact;
