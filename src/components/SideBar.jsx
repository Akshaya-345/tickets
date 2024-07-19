import React from 'react';
import { FaPlusSquare } from 'react-icons/fa';

const Sidebar = ({ onFilterChange }) => {
  const handleAllTicketsClick = () => {
    onFilterChange('all'); // Update with the appropriate filter value
  };
  return (
    <div className="w-56 p-4 bg-gray-800 border-r border-gray-600 shadow-lg h-full flex flex-col">
      <div className="flex items-center mb-4">
        <FaPlusSquare className="text-white mr-2" />
        <button onClick={() => window.location.href = '/addticket'}>
            <h2 className="text-xl font-bold text-white">Add Ticket</h2>
        </button>
      </div>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={handleAllTicketsClick}
      >
        All Tickets
      </button>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={() => onFilterChange('unassigned')}
      >
        Unassigned
      </button>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={() => onFilterChange('pending')}
      >
        All Pending
      </button>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={() => onFilterChange('complete')}
      >
        All Complete
      </button>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={() => onFilterChange('junk')}
      >
        All Junk
      </button>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={() => onFilterChange('assignedToMe')}
      >
        Assigned to me
      </button>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={() => onFilterChange('createdByMe')}
      >
        Created by me
      </button>
      <button
        className="w-full p-2 bg-gray-900 border border-gray-600 text-left hover:bg-gray-700 text-white rounded-lg mb-2"
        onClick={() => onFilterChange('completedByMe')}
      >
        Completed by me
      </button>
      
      <div className="flex-grow"></div>
    </div>
  );
};

export default Sidebar;