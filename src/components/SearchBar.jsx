import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, onTicketsPerPageChange, onFilterChange, onSelectAll, ticketsPerPage: initialTicketsPerPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketsPerPage, setTicketsPerPage] = useState(initialTicketsPerPage);
  const [filter, setFilter] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setTicketsPerPage(initialTicketsPerPage);
  }, [initialTicketsPerPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleTicketsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTicketsPerPage(value);
    onTicketsPerPageChange(value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    onSelectAll(checked);
  };

  return (
    <div className="flex items-center mb-5 w-full p-4 bg-gray-800 rounded-lg shadow-lg">
      <input
        type="checkbox"
        className="mr-2 h-6 w-6 cursor-pointer text-white bg-gray-900 border-gray-600 rounded"
        checked={selectAll}
        onChange={handleSelectAllChange}
      />
      <input
        type="text"
        className="flex-1 p-2 mr-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white placeholder-gray-400"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <span className="mr-2 text-white">Show</span>
      <select
        className="p-2 mr-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white"
        value={ticketsPerPage}
        onChange={handleTicketsPerPageChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <span className="mr-2 text-white">Filter</span>
      <select
        className="p-2 mr-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="">All</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
        <option value="closed">Closed</option>
        <option value="open">Open</option>
      </select>
    </div>
  );
};

export default SearchBar;