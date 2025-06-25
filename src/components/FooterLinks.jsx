const FooterLinks = () => {
  const links = ["Home", "Explore", "About Us", "How it works"];
  return (
    <div>
      <h3 className="mb-3 font-semibold">Quick Links</h3>
      <ul className="space-y-2 text-sm cursor-pointer">
        {links.map((link) => (
          <li key={link}>
            <a href="/landing" className="hover:text-green-600">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
