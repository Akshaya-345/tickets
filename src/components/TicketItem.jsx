import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTicket, updateTicket } from '../redux/ticketsSlice';
import emailIcon from '../images/mail.png';
import messageIcon from '../images/message.png';
import callIcon from '../images/call.png';
import whatsappIcon from '../images/whatsapp.png';
import facebookIcon from '../images/facebook.png';
import instagramIcon from '../images/instagram.png';
import twitterIcon from '../images/twitter.png';

const TicketItem = ({ ticket, onSelectTicket, isSelected }) => {
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderSendThroughIcon = () => {
    let iconSrc = '';
    switch (ticket.sendThrough) {
      case 'email':
        iconSrc = emailIcon;
        break;
      case 'message':
        iconSrc = messageIcon;
        break;
      case 'call':
        iconSrc = callIcon;
        break;
      case 'whatsapp':
        iconSrc = whatsappIcon;
        break;
      case 'facebook':
        iconSrc = facebookIcon;
        break;
      case 'instagram':
        iconSrc = instagramIcon;
        break;
      case 'twitter':
        iconSrc = twitterIcon;
        break;
      default:
        iconSrc = ''; 
        break;
    }

    return iconSrc && <img src={iconSrc} alt={ticket.sendThrough} className="w-8 h-8" />;
  };

  const handleSelectChange = (e) => {
    onSelectTicket(ticket.id, e.target.checked);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ticket ${ticket.id}?`)) {
      dispatch(deleteTicket(ticket.id));
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

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="grid grid-cols-11 items-center p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 w-full relative">
      <div className="col-span-1">
        <input
          type="checkbox"
          className="mr-2 h-6 w-6 cursor-pointer"
          checked={isSelected}
          onChange={handleSelectChange}
        />
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="font-bold bg-gray-300 text-gray-800 rounded-full h-10 w-10 flex items-center justify-center">
          {ticket.email.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="col-span-3 flex flex-col">
        <span className="font-bold text-lg text-gray-800">{truncate(ticket.email, 20)}</span>
        <span className="text-gray-500 text-sm">{truncate(ticket.subject, 30)}</span>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <span className="font-semibold text-gray-700">{ticket.status}</span>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        {renderSendThroughIcon()}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <span className={`font-semibold ${ticket.priority.toLowerCase() === 'high' ? 'text-red-500' : ticket.priority.toLowerCase() === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
          {ticket.priority}
        </span>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <span className="font-semibold text-gray-700">{ticket.assignedTo}</span>
      </div>
      <div className="col-span-1 flex flex-col items-end">
        <button
          className="text-blue-500 hover:text-blue-700 mb-2"
          onClick={() => navigate(`/tickets/${ticket.id}`)}
        >
          Details
        </button>
        <span className="text-gray-500 text-sm">{ticket.date}</span>
      </div>
    </div>
  );
};

export default TicketItem;