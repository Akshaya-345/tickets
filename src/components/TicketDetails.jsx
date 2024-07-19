import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTicket, updateTicket, fetchTickets } from '../redux/ticketsSlice';

const TicketDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tickets = useSelector((state) => state.tickets.tickets);
  const status = useSelector((state) => state.tickets.status);
  const error = useSelector((state) => state.tickets.error);
  const ticket = tickets.find((ticket) => ticket.id === id);
  const username = localStorage.getItem('username');
  const [editMode, setEditMode] = useState(false);
  const [editedTicket, setEditedTicket] = useState(ticket);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (ticket) {
      setEditedTicket(ticket);
    }
  }, [ticket]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    dispatch(updateTicket(editedTicket));
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ticket ${ticket.id}?`)) {
      dispatch(deleteTicket(ticket.id));
      navigate('/');
    }
  };

  const handleCloseTicket = () => {
    const updatedTicket = {
      ...ticket,
      status: 'closed',
      completedBy: username,
    };
    dispatch(updateTicket(updatedTicket));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-4 mb-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">{editMode ? 'Edit Ticket' : 'Ticket Details'}</h2>
        <button className="text-gray-600 hover:text-gray-800" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
      {editMode ? (
        <>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={editedTicket.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={editedTicket.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={editedTicket.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <select
              name="priority"
              value={editedTicket.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={editedTicket.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Assigned To</label>
            <select
              name="assignedTo"
              value={editedTicket.assignedTo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="john">John</option>
              <option value="jane">Jane</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Send Through</label>
            <select
              name="sendThrough"
              value={editedTicket.sendThrough}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="email">Email</option>
              <option value="message">Message</option>
              <option value="call">Call</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
              Save
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <div className="p-2 border rounded">{ticket.email}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Subject</label>
            <div className="p-2 border rounded">{ticket.subject}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <div className="p-2 border rounded">{ticket.status}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <div className="p-2 border rounded">{ticket.priority}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date</label>
            <div className="p-2 border rounded">{ticket.date}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Assigned To</label>
            <div className="p-2 border rounded">{ticket.assignedTo}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Send Through</label>
            <div className="p-2 border rounded">{ticket.sendThrough}</div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEdit}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
              Delete
            </button>
            {ticket.status !== 'closed' && (
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCloseTicket}>
                Close Ticket
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketDetails;