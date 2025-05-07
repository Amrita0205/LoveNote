import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState('');
  const specialDate = new Date('2025-05-20T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = specialDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setCountdown(`${days}d ${hours}h`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MotionText
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      fontSize={{ base: 'lg', sm: 'xl' }}
      bgGradient="linear(to-r, #ff00ff, #00ffff)"
      bgClip="text"
      textShadow="0 0 5px #ff00ff"
      textAlign="center"
      mb={4}
      fontFamily="'Orbitron', sans-serif"
    >
      Until Our Special Day: {countdown} 
      <Text as="span" ml={2} fontSize="xl" color="pink.300" >✨</Text>
          </MotionText>
  );
}