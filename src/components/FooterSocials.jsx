const FooterSocials = () => {
  const socials = ["Facebook", "LinkedIn", "Instagram", "X"];
  return (
    <div>
      <h3 className="mb-3 font-semibold">Socials</h3>
      <ul className="space-y-2 text-sm">
        {socials.map((social) => (
          <li key={social}>
            <a href="/" className="hover:text-green-600">
              {social}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSocials;
