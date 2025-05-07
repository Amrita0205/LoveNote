import { useState } from "react";
import axios from "axios";
import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    useToast,
    Flex,
    keyframes,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

// Keyframes (same as original)
const glow = keyframes`
  0% { box-shadow: 0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 15px #ff1493; }
  50% { box-shadow: 0 0 10px #ff1493, 0 0 20px #ff1493, 0 0 30px #ff1493; }
  100% { box-shadow: 0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 15px #ff1493; }
`;

const sparkleAnimation = keyframes`
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
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

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.username || formData.username.length < 3) {
            toast({
                title: "Invalid Username",
                description: "Username must be at least 3 characters long.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        if (!formData.password || formData.password.length < 6) {
            toast({
                title: "Invalid Password",
                description: "Password must be at least 6 characters long.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                username: formData.username,
                password: formData.password,
            });

            if (response.data.success) {
                setFormData({ username: "", password: "", confirmPassword: "" }); // Clear form
                toast({
                    title: (
                        <Flex align="center">
                            <Text mr={2}>Registration Successful!</Text>
                            <Text as="span" fontSize="xl" color="green.300" animation={`${heartBeat} 1s infinite`}>💝</Text>
                        </Flex>
                    ),
                    description: (
                        <Flex align="center">
                            <Text mr={2}>Time to start your love journey, senpai!</Text>
                            <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
                        </Flex>
                    ),
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/login");
            }
        } catch (error) {
            console.error('Registration error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
            });
            let errorMessage = error.response?.data?.message || "Try again, dear!";
            // Handle potential duplicate username error (MongoDB duplicate key)
            if (error.response?.status === 500 && error.response?.data?.message === "Internal Server Error") {
                errorMessage = "Username may already exist. Please choose a different one.";
            }
            toast({
                title: "Registration Failed",
                description: (
                    <Flex align="center">
                        <Text mr={2}>{errorMessage}</Text>
                        <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💕</Text>
                    </Flex>
                ),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
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
                    animation={i % 2 === 0 ? undefined : `${sparkleAnimation} 2s infinite`}
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
                    Create Your Love Story
                    <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
                </Text>
                <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                    <Input
                        name="username"
                        placeholder="Choose Your Name..."
                        value={formData.username}
                        onChange={handleChange}
                        bg="gray.800"
                        border="none"
                        color="white"
                        rounded="full"
                        _placeholder={{ color: 'pink.300', fontStyle: 'italic' }}
                        _focus={{ boxShadow: '0 0 5px #ff1493' }}
                        size={{ base: 'md', sm: 'lg' }}
                        required
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Your Secret Password..."
                        value={formData.password}
                        onChange={handleChange}
                        bg="gray.800"
                        border="none"
                        color="white"
                        rounded="full"
                        _placeholder={{ color: 'pink.300', fontStyle: 'italic' }}
                        _focus={{ boxShadow: '0 0 5px #ff1493' }}
                        size={{ base: 'md', sm: 'lg' }}
                        required
                    />
                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Your Password..."
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        bg="gray.800"
                        border="none"
                        color="white"
                        rounded="full"
                        _placeholder={{ color: 'pink.300', fontStyle: 'italic' }}
                        _focus={{ boxShadow: '0 0 5px #ff1493' }}
                        size={{ base: 'md', sm: 'lg' }}
                        required
                    />
                    <MotionButton
                        type="submit"
                        bgGradient="linear(to-r, #ff1493, #00ffff)"
                        color="white"
                        rounded="full"
                        w="full"
                        size={{ base: 'md', sm: 'lg' }}
                        whileHover={{ scale: 1.1, boxShadow: '0 0 15px #ff1493' }}
                        whileTap={{ scale: 0.9 }}
                        animation={`${pulse} 1.5s infinite`}
                        isLoading={loading}
                    >
                        Begin Our Journey
                        <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💝</Text>
                    </MotionButton>
                    <Text color="pink.300" textAlign="center" mt={2}>
                        Already have an account?{" "}
                        <Text
                            as="span"
                            color="cyan.300"
                            cursor="pointer"
                            _hover={{
                                textDecoration: "underline",
                                textShadow: "0 0 10px #00ffff",
                            }}
                            onClick={() => navigate("/login")}
                            animation={`${pulse} 2s infinite`}
                        >
                            Return to your love 💕
                        </Text>
                    </Text>
                    
                </VStack>
            </MotionBox>
        </MotionBox>
    );
};

export default RegisterForm;