const FooterLinks = () => {
  const links = ["Home", "Explore", "About Us", "How it works"];
  return (
    <div>
      <h5
        style={{
          marginTop: "20px",
        }}
        className="mb-3 mt-6 font-semibold"
      >
        Quick Links
      </h5>
      <span className="space-y-2 text-sm cursor-pointer">
        {links.map((link, index) => (
          <h5 key={index}>
            <a
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "15px",
              }}
              href="/"
              className="hover:text-green-600"
            >
              {link}
            </a>
          </h5>
        ))}
      </span>
    </div>
  );
};

export default FooterLinks;
