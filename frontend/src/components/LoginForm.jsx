import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  keyframes,
  Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const glow = keyframes`
  0% { box-shadow: 0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 15px #ff1493; }
  50% { box-shadow: 0 0 10px #ff1493, 0 0 20px #ff1493, 0 0 30px #ff1493; }
  100% { box-shadow: 0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 15px #ff1493; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export default function LoginForm() {
  const { setToken, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);// This helps add the load state which means which we use this
  //  until time time that login and token shit has completed and that state to show that symbol
  const toast = useToast();
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username,
        password,
      });
      const { token, user } = res.data;
      setToken(token);
      localStorage.setItem('token', token);
      const userData = user || { _id: jwtDecode(token).id };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: (
          <Flex align="center">
            <Text mr={2}>Welcome, Pickle!</Text>
            <Text as="span" fontSize="xl" color="green.300" animation={`${heartBeat} 1s infinite`}>🥒</Text>
          </Flex>
        ),
        description: (
          <Flex align="center">
            <Text mr={2}>Ready to leave a steamy love note, senpai?</Text>
            <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
          </Flex>
        ),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/notes');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast({
        title: 'Login Failed',
        description: (
          <Flex align="center">
            <Text mr={2}>{error.response?.data?.error || 'Try again, senpai!'}</Text>
            <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💕</Text>
          </Flex>
        ),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally{
      setLoading(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      bgGradient="linear(to-b, #1a0033, #660066)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: 4, sm: 6 }}
      fontFamily="'Cherry Swash', cursive"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("https://www.transparenttextures.com/patterns/stardust.png") repeat',
        opacity: 0.3,
        zIndex: -1,
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: 'radial(ellipse at center, rgba(255,20,147,0.2) 0%, rgba(0,0,0,0.8) 70%)',
        zIndex: -1,
      }}
    >
      {/* Sparkles and Hearts */}
      {[...Array(8)].map((_, i) => (
        <MotionBox
          key={i}
          position="absolute"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          fontSize="lg"
          color={i % 2 === 0 ? "pink.300" : "yellow.300"}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {i % 2 === 0 ? '💖' : '✨'}
        </MotionBox>
      ))}
      <MotionBox
        bg="rgba(0, 0, 0, 0.7)"
        p={{ base: 6, sm: 8 }}
        rounded="2xl"
        animation={`${glow} 2s infinite`}
        boxShadow="0 0 30px rgba(255, 20, 147, 0.7)"
        w="full"
        maxW={{ base: 'sm', sm: 'md' }}
        border="2px solid"
        borderColor="pink.200"
      >
        <Text
          fontSize={{ base: '2xl', sm: '3xl' }}
          bgGradient="linear(to-r, #ff1493, #00ffff)"
          bgClip="text"
          textAlign="center"
          mb={4}
          textShadow="0 0 15px #ff1493, 0 0 25px #00ffff"
          animation={`${pulse} 2s infinite`}
        >
          Welcome, Senpai
          <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
        </Text>
        <VStack spacing={4}>
          <Input
            placeholder="Your Name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="gray.800"
            border="none"
            color="white"
            rounded="full"
            _placeholder={{ color: 'pink.300', fontStyle: 'italic' }}
            _focus={{ boxShadow: '0 0 5px #ff1493' }}
            size={{ base: 'md', sm: 'lg' }}
          />
          <Input
            type="password"
            placeholder="Our Secret Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="gray.800"
            border="none"
            color="white"
            rounded="full"
            _placeholder={{ color: 'pink.300', fontStyle: 'italic' }}
            _focus={{ boxShadow: '0 0 5px #ff1493' }}
            size={{ base: 'md', sm: 'lg' }}
          />
          <MotionButton
            bgGradient="linear(to-r, #ff1493, #00ffff)"
            color="white"
            rounded="full"
            w="full"
            size={{ base: 'md', sm: 'lg' }}
            onClick={login}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px #ff1493' }}
            whileTap={{ scale: 0.9 }}
            animation={`${pulse} 1.5s infinite`}
            isLoading={loading} // Apply loading state to button
            loadingText="Logging in..." // Optional: Show text during loading
          >
            Let’s Begin, My Love
            <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>🐧</Text>
          </MotionButton>
          <Text color="pink.300" textAlign="center" mt={2}>
                  New here, senpai?{' '}
                        <Text
                            as="span"
                            color="cyan.300"
                            cursor="pointer"
                            _hover={{
                                textDecoration: "underline",
                                textShadow: "0 0 10px #00ffff",
                            }}
                            onClick={() => navigate("/register")}
                            animation={`${pulse} 2s infinite`}
                        >
                            Join our love story 😉
                        </Text>
                    </Text>
        </VStack>
      </MotionBox>
    </MotionBox>
  );
}