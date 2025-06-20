const FooterSocials = () => {
  const socials = ["Facebook", "LinkedIn", "Instagram", "X"];
  return (
    <div>
      <h5
        style={{
          marginTop: "20px",
        }}
        className="mb-3 mt-6 font-semibold"
      >
        Socials
      </h5>
      <span className="space-y-2 text-sm">
        {socials.map((social, index) => (
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
              {social}
            </a>
          </h5>
        ))}
      </span>
    </div>
  );
};

export default FooterSocials;
