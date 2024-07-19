import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTicket } from '../redux/ticketsSlice';
import { Link, useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('low');
  const [date, setDate] = useState('');
  const [assignedTo, setAssignTo] = useState('');
  const [junk, setJunk] = useState('yes');
  const [sendThrough, setSendThrough] = useState('whatsapp');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    const newTicket = {
      email,
      subject,
      status,
      priority,
      date,
      assignedTo,
      junk,
      sendThrough,
      createdBy: username,
      completedBy: 'None'
    };
    dispatch(addTicket(newTicket));
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg m-4">
        <h2 className="text-3xl mb-6 font-bold text-blue-600 text-center">New Ticket</h2>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="supervisor">Supervisor</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignTo(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
          >
            <option value="Unassigned">Unassinged</option>
            <option value="Akshaya">Akshaya</option>
            <option value="Ashrith">Ashrith</option>
            <option value="Raj">Raj</option>
            <option value="Kishore">Kishore</option>
            <option value="Suhas">Suhas</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">JUNK</label>
          <select
            value={junk}
            onChange={(e) => setJunk(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-700">Send Through</label>
          <select
            value={sendThrough}
            onChange={(e) => setSendThrough(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="message">Message</option>
            <option value="email">Email</option>
            <option value="call">Call</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
          </select>
        </div>
        <div className="flex justify-end">
          <Link to="/" className="mr-4 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200">
            Cancel
          </Link>
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
            Add Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;