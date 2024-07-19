import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketDetails from './components/TicketDetails';
import Login from './components/Login';

const AppLayout = ({ children, username, onLogout, onFilterChange }) => (
  <div className="flex h-screen w-full overflow-hidden bg-gray-200">
    <Sidebar onFilterChange={onFilterChange} />
    <div className="flex flex-col flex-grow overflow-hidden">
      <Header username={username} onLogout={onLogout} />
      <main className="flex-grow p-4 overflow-hidden">
        {children}
      </main>
    </div>
  </div>
);

const MainRoutes = ({ isAuthenticated, username, onLogout, handleLogin, filter, handleFilterChange }) => {
  const location = useLocation();
  const isAddTicketPage = location.pathname === '/addticket';

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-full">
      {isAddTicketPage ? (
        <Routes>
          <Route path="/addticket" element={<TicketForm />} />
        </Routes>
      ) : (
        <AppLayout username={username} onLogout={onLogout} onFilterChange={handleFilterChange}>
          <Routes>
            <Route path="/" element={<TicketList filter={filter} />} />
            <Route path="/addticket" element={<TicketForm />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
          </Routes>
        </AppLayout>
      )}
    </div>
  );
};

const App = () => {
  const [filter, setFilter] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const user = localStorage.getItem('username');
    setIsAuthenticated(auth);
    setUsername(user || '');
  }, []);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Router>
      <MainRoutes
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={handleLogout}
        handleLogin={handleLogin}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
    </Router>
  );
};

export default App;