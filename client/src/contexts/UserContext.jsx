import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  const value = {
    userId,
    setUserId,
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    sessionId,
    setSessionId,
    csrfToken,
    setCsrfToken
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node
};