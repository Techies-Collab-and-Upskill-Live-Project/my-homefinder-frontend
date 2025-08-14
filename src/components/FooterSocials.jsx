const FooterSocials = () => {
  const socials = [
    {name: "Facebook", url:"https://facebook.com"},
    {name: "LinkedIn", url:"https://linkedin.com"},
    {name: "Instagram", url:"https://instagram.com"},
    {name: "X", url:"https://x.com"},
  ];

  return (
    <div>
      <h5 className="mb-4 text-base font-semibold text-gray-800">Socials</h5>
      <ul className="space-y-2 text-sm">
        {socials.map((social, index) => (
          <li key={index}>
            <a
              href={social.url}
              className="text-gray-700 hover:text-green-600 transition"
              target="blank"
            >
              {social.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSocials;
