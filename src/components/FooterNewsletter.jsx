const FooterNewsletter = () => {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Subscribe to our Newsletter</h3>
      <form className="flex space-x-2">
        <input
          type="email"
          placeholder="Enter your Email here"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="px-4 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter;
