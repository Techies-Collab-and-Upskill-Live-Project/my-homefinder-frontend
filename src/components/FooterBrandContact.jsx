import footerImg from "/images/FooterLogo.png";
import {
  PhoneIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
} from "@phosphor-icons/react";

const FooterBrandContact = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <img src={footerImg} className="-ml-5" alt="logo" />
        <span className="text-2xl font-bold text-green-600">MyHomeFinder</span>
      </div>
      <div className="text-sm flex items-start space-x-2">
        <MapPinIcon size={20} weight="bold" />
        <span>5123 Market St., #22B, Charlottesville, California 44635</span>
      </div>
      <p className="text-sm flex items-center space-x-2">
        <PhoneIcon size={20} weight="bold" />
        <a
          style={{
            textDecoration: "none",
            color: "black",
          }}
          href="tel:+2344345464356"
          className="hover:text-green-600"
        >
          434-546-4356
        </a>
      </p>
      <p className="text-sm flex items-center space-x-2">
        <EnvelopeSimpleIcon size={20} weight="bold" />
        <a
          style={{
            textDecoration: "none",
            color: "black",
          }}
          href="mailto:contact@lift.agency"
          className="hover:text-green-600"
        >
          contact@myhomefinder.com
        </a>
      </p>
    </div>
  );
};

export default FooterBrandContact;
