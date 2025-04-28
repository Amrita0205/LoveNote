import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './components/LoginForm';
import NoteBoard from './components/NoteBoard';
import theme from './styles/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
    const { token } = useContext(AuthContext);

    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={token ? <NoteBoard /> : <LoginForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/notes" element={<NoteBoard />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}