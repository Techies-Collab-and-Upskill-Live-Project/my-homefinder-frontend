const FooterNewsletter = () => {
  return (
    <div className="max-w-md w-full mt-5">
      <h5 className="text-lg font-semibold mb-4 text-gray-800">
        Subscribe to our Newsletter
      </h5>

      <form className="flex items-center overflow-hidden rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-green-500 transition-shadow">
        <input
          style={{
            marginLeft: "6px",
          }}
          type="email"
          placeholder="Enter your email"
          className="flex-1 ml-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold padding_button text-sm transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter;
