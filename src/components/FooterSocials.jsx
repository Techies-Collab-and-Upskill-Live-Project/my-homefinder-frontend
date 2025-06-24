const FooterSocials = () => {
  const socials = ["Facebook", "LinkedIn", "Instagram", "X"];

  return (
    <div>
      <h5 className="mb-4 text-base font-semibold text-gray-800">Socials</h5>
      <ul className="space-y-2 text-sm">
        {socials.map((social, index) => (
          <li key={index}>
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 transition"
            >
              {social}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSocials;
