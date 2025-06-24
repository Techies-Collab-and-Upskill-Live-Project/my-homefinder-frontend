const FooterLinks = () => {
  const links = ["Home", "Explore", "About Us", "How it works"];

  return (
    <div>
      <h5 className="mb-4 text-base font-semibold text-gray-800">
        Quick Links
      </h5>
      <ul className="space-y-2 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 transition"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
