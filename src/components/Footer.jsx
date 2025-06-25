import FooterBrandContact from "./FooterBrandContact";
import FooterLinks from "./FooterLinks";
import FooterSocials from "./FooterSocials";
import FooterNewsletter from "./FooterNewsletter";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-green-600 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <FooterBrandContact />
        <FooterLinks />
        <FooterSocials />
        <FooterNewsletter />
      </div>
      <div className="border-t border-green-600 mt-10 pt-4">
        <p className="text-center text-sm text-gray-500">
          © 2025 MyHomeFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
