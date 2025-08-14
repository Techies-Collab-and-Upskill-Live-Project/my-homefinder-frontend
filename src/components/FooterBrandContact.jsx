import footerImg from "/images/FooterLogo.png";
import {
  PhoneIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
} from "@phosphor-icons/react";

const FooterBrandContact = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <img src={footerImg} className="h-10 w-auto" alt="logo" />
        <span className="text-xl font-bold text-green-600">MyHomeFinder</span>
      </div>

      <div className="text-sm flex items-start gap-2 text-gray-700">
        <MapPinIcon size={20} weight="bold" />
        <span>Lagos, Nigeria</span>
      </div>

      <div className="text-sm flex items-center gap-2 text-gray-700">
        <PhoneIcon size={20} weight="bold" />
        <a href="tel:+2344345464356" className="hover:text-green-600">
          +234 123 4567 890
        </a>
      </div>

      <div className="text-sm flex items-center gap-2 text-gray-700">
        <EnvelopeSimpleIcon size={20} weight="bold" />
        <a
          href="mailto:contact@myhomefinder.com"
          className="hover:text-green-600"
        >
          myhomefinder20@gmailcom
        </a>
      </div>
    </div>
  );
};

export default FooterBrandContact;
