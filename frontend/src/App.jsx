import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NoteBoard from './components/NoteBoard';
import theme from './styles/theme';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export default function App() {
    const { token } = useContext(AuthContext);

    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/notes" /> : <LoginForm />} />
                    <Route path="/login" element={token ? <Navigate to="/notes" /> : <LoginForm />} />
                    <Route path="/register" element={token ? <Navigate to="/notes" /> : <RegisterForm />} /> 
                    <Route path="/notes" element={token ? <NoteBoard /> : <Navigate to="/" />} />
                    <Route path="*" element={<div>404 - Route Not Found</div>} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}