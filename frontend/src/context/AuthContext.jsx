import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(async () => {
    if (!user?._id || !token) {
      console.log('Cannot fetch notes: Missing user ID or token', { user, token });
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/notes/get_notes/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Fetch notes response:', res.data);
      setNotes(res.data.data.notes || []);
    } catch (error) {
      console.error('Error fetching notes:', error.response?.data || error.message);
    }
  }, [token, user]);

  useEffect(() => {
    console.log('AuthContext useEffect triggered:', { token, user }); // Debug
    if (token) {
      try {
        // Decode token to get user ID if user is not set or invalid
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const userId = decoded.id || decoded._id || decoded.userId;
        if (!userId) {
          throw new Error('No user ID found in token');
        }
        if (!user || user._id !== userId) {
          const newUser = { _id: userId };
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }
      localStorage.setItem('token', token);
      fetchNotes();
      const tokenExpiryTime = 3600 * 1000; // 1 hour
      const expiryTimeout = setTimeout(() => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }, tokenExpiryTime);
      return () => clearTimeout(expiryTimeout);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setNotes([]);
    }
  }, [token, fetchNotes]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, notes, setNotes, fetchNotes }}>
      {children}
    </AuthContext.Provider>
  );
};