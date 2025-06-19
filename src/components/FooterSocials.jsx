const FooterSocials = () => {
  const socials = ["Facebook", "LinkedIn", "Instagram", "X"];
  return (
    <div>
      <h3 className="mb-3 mt-6 font-semibold">Socials</h3>
      <span className="space-y-2 text-sm">
        {socials.map((social, index) => (
          <h5 key={index}>
            <a href="/" className="hover:text-green-600">
              {social}
            </a>
          </h5>
        ))}
      </span>
    </div>
  );
};

export default FooterSocials;
