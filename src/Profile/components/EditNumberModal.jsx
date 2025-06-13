import React, { useState, useEffect } from 'react';
import { useProfile } from '../Assets/ProfileContext'; // Adjust path as needed

const EditNumberModal = ({ currentNumber, onClose }) => {
  const { updatePhoneNumber } = useProfile(); // Get updatePhoneNumber from context
  const [newNumber, setNewNumber] = useState(currentNumber || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync internal state with prop if currentNumber changes externally
  useEffect(() => {
    setNewNumber(currentNumber || '');
  }, [currentNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!newNumber.trim()) {
      setError('Phone number cannot be empty.');
      return;
    }
    if (!/^\+?[0-9\s-()]+$/.test(newNumber.trim())) {
      setError('Invalid phone number format.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay (replace with actual backend call)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Call the context function to update the number
      updatePhoneNumber(newNumber.trim());
      onClose(); // Close the modal on success
    } catch (err) {
      setError('Failed to update number. Please try again.');
      console.error('Error updating phone number:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-none bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-red-100 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Phone Number</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              New Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="e.g., +1234567890"
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNumberModal;