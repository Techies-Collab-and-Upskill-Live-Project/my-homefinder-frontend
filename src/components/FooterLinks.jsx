const FooterLinks = () => {
  const links = ["Home", "Explore", "About Us", "How it works"];
  return (
    <div>
      <h3 className="mb-3 mt-6 font-semibold">Quick Links</h3>
      <span className="space-y-2 text-sm cursor-pointer">
        {links.map((link, index) => (
          <h5 key={index}>
            <a href="/" className="hover:text-green-600">
              {link}
            </a>
          </h5>
        ))}
      </span>
    </div>
  );
};

export default FooterLinks;
