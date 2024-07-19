import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets } from '../redux/ticketsSlice';
import TicketItem from './TicketItem';
import SearchBar from './SearchBar';

const TicketList = ({ filter }) => {
  const dispatch = useDispatch();
  const { tickets, status, error } = useSelector((state) => state.tickets);
  const username = localStorage.getItem('username');
  const [searchQuery, setSearchQuery] = useState('');
  const [barFilter, setBarFilter] = useState('');
  const [ticketsPerPage, setTicketsPerPage] = useState(() => {
    return parseInt(localStorage.getItem('ticketsPerPage'), 10) || 5;
  });
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleBarFilterChange = (filterValue) => {
    setBarFilter(filterValue);
    setCurrentPage(1); // Reset to the first page when filter changes
  };
  useEffect(() => {
    if (filter === 'all') {
      // Fetch all tickets
      dispatch(fetchTickets());
    }
  }, [filter, dispatch]);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets());
    }
  }, [status, dispatch]);

  useEffect(() => {
    localStorage.setItem('ticketsPerPage', ticketsPerPage);
  }, [ticketsPerPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const handleTicketsPerPageChange = (number) => {
    setTicketsPerPage(number);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allTicketIds = filteredTickets.map((ticket) => ticket.id);
      setSelectedTickets(allTicketIds);
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (id, isSelected) => {
    if (isSelected) {
      setSelectedTickets((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedTickets((prevSelected) => prevSelected.filter((ticketId) => ticketId !== id));
    }
  };

  const barFilteredTickets = Array.isArray(tickets)
    ? tickets.filter((ticket) => {
        const matchesSearch =
          ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = true;
        if (barFilter === 'closed') {
          matchesFilter = ticket.status.toLowerCase() === 'closed';
        } else if (barFilter === 'open') {
          matchesFilter = ticket.status.toLowerCase() !== 'closed';
        } else if (barFilter) {
          matchesFilter = ticket.priority.toLowerCase() === barFilter.toLowerCase();
        }

        return matchesSearch && matchesFilter;
      })
    : [];

  const filteredTickets = Array.isArray(barFilteredTickets)
    ? barFilteredTickets.filter((ticket) => {
        let matchesFilter = true;
        if (filter === 'all') {
          matchesFilter = true; 
        }
        else if (filter === 'unassigned') {
          matchesFilter = !ticket.assignedTo || ticket.assignedTo.toLowerCase() === 'unassigned';
        } else if (filter === 'pending') {
          matchesFilter = ticket.status === 'pending';
        } else if (filter === 'complete') {
          matchesFilter = ticket.status=== 'closed';
        } else if (filter === 'junk') {
          matchesFilter = ticket.junk === 'yes';
        } else if (filter === 'assignedToMe') {
          matchesFilter = ticket.assignedTo.toLowerCase() === username.toLowerCase();
        } else if (filter === 'createdByMe') {
          matchesFilter = ticket.createdBy === username;
        } else if (filter === 'completedByMe') {
          matchesFilter = ticket.completedBy && ticket.completedBy=== username;
        }

        return matchesFilter;
      })
    : [];

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1;
      }
      if (direction === 'next' && prevPage < totalPages) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full h-screen p-4">
      <SearchBar
        onSearch={handleSearch}
        onTicketsPerPageChange={handleTicketsPerPageChange}
        onFilterChange={handleBarFilterChange}
        onSelectAll={handleSelectAll}
        ticketsPerPage={ticketsPerPage}
      />
      <div className="flex flex-col w-full overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        {filteredTickets.length === 0 ? (
          <div className="text-center text-gray-500">No items to display.</div>
        ) : (
          filteredTickets
            .slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage)
            .map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                onSelectTicket={handleSelectTicket}
                isSelected={selectedTickets.includes(ticket.id)}
              />
            ))
        )}
      </div>
      <div className="flex justify-between items-center w-full p-4 mb-4">
        <button
          className="bg-[#1f2937] p-2 rounded-lg text-white"
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-[#1f2937]">
          <b>Page {currentPage} of {totalPages}</b>
        </span>
        <button
          className="bg-[#1f2937] p-2 rounded-lg text-white"
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketList;