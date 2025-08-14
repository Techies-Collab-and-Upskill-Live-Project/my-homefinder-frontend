const FooterNewsletter = () => {
  return (
    <div>
      <h5 className="text-base font-semibold text-gray-800 mb-4">
        Subscribe to our Newsletter
      </h5>

      <form className="flex overflow-hidden rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-green-500">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter;
