// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import {
//   Box,
//   Heading,
//   SimpleGrid,
//   VStack,
//   Input,
//   Select,
//   Button,
//   useToast,
//   Flex,
//   Text,
//   keyframes,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import NoteCard from './NoteCard.jsx';
// import CountdownTimer from './CountTimer.jsx';

// const MotionBox = motion(Box);
// const MotionButton = motion(Button);

// const glow = keyframes`
//   0% { box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #00ffff; }
//   50% { box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #00ffff; }
//   100% { box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #00ffff; }
// `;

// const sparkleAnimation = keyframes`
//   0% { opacity: 0; transform: scale(0); }
//   50% { opacity: 1; transform: scale(1); }
//   100% { opacity: 0; transform: scale(0); }
// `;

// export default function NoteBoard() {
//   const { token, user, notes, setNotes, fetchNotes, setToken, setUser } = useContext(AuthContext);
//   const [message, setMessage] = useState('');
//   const [color, setColor] = useState('#ffccff');
//   const [editingNote, setEditingNote] = useState(null);
//   const [isMusicPlaying, setIsMusicPlaying] = useState(false);
//   const [isLoveMessageOpen, setIsLoveMessageOpen] = useState(false);
//   const [loveMessage, setLoveMessage] = useState('');
//   const toast = useToast();

//   const loveMessages = [
//     "Pickle, you make my heart sparkle like a thousand stars! 💖✨",
//     "Senpai, every moment with you feels like a magical anime episode! 🥰",
//     "I’m so lucky to have you, my sweet Pickle—let’s write our love story forever! 💕",
//     "You’re my favorite person in the whole universe, senpai! 🥒💖",
//     "Every note I write is a piece of my heart for you, Pickle! 💌✨",
//   ];

//   // Fetch notes on mount
//   useEffect(() => {
//     if (user?._id && token) {
//       fetchNotes();
//     }
//   }, [user, token, fetchNotes]);

//   // Handle note creation
//   const handleCreateNote = async () => {
//     if (!message || !color) {
//       toast({
//         title: 'Oops, Pickle! 🥒',
//         description: 'Please write a message and choose a color, senpai! 💖',
//         status: 'warning',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }
//     if (!user?._id || !token) {
//       toast({
//         title: 'Error',
//         description: 'Please log in to create a note, my love! 💕',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/notes/create_notes/${user._id}`,
//         { message, color },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log('Create note response:', response.data);
//       const newNote = response.data.data;
//       setNotes([...notes, newNote]);
//       setMessage('');
//       setColor('#ffccff');
//       toast({
//         title: 'Love Note Added! 💖',
//         description: 'Your note is ready for senpai, Pickle! ✨',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('Create note error:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       toast({
//         title: 'Error',
//         description: error.response?.data?.error || 'Failed to create note, Pickle! 🥒',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   // Handle note update
//   const handleUpdateNote = async () => {
//     if (!message || !color || !editingNote) return;
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_API_URL}/notes/update_notes/${user._id}/${editingNote._id}`,
//         { message, color },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log('Update note response:', response.data);
//       const updatedNote = response.data.data;
//       setNotes(
//         notes.map((note) =>
//           note._id === editingNote._id ? { ...note, message: updatedNote.message, color: updatedNote.color } : note
//         )
//       );
//       setMessage('');
//       setColor('#ffccff');
//       setEditingNote(null);
//       toast({
//         title: 'Love Note Updated! 💕',
//         description: 'Your note has been updated, senpai! ✨',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('Update note error:', error.response?.data || error.message);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.error || 'Failed to update note, Pickle! 🥒',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   // Start editing a note
//   const startEditing = (note) => {
//     setEditingNote(note);
//     setMessage(note.message);
//     setColor(note.color);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setToken('');
//     setUser(null);
//     setNotes([]);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsMusicPlaying(false);
//     toast({
//       title: 'See You Soon, Senpai! 💕',
//       description: 'I’ll miss you, Pickle! Come back soon! 🥒✨',
//       status: 'info',
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   // Toggle background music
//   const toggleMusic = () => {
//     const audio = document.getElementById('background-music');
//     if (isMusicPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsMusicPlaying(!isMusicPlaying);
//   };

//   // Show a random love message
//   const showLoveMessage = () => {
//     const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
//     setLoveMessage(randomMessage);
//     setIsLoveMessageOpen(true);
//   };

//   return (
//     <MotionBox
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       bg="gray.900"
//       minH="100vh"
//       p={6}
//       color="white"
//       fontFamily="'Orbitron', sans-serif"
//       position="relative"
//       overflow="hidden"
//       _before={{
//         content: '""',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: 'url("https://www.transparenttextures.com/patterns/stardust.png") repeat',
//         opacity: 0.2,
//         zIndex: -1,
//       }}
//     >
//       {/* Background Music */}
//       <audio id="background-music" loop>
//         <source src="https://www.bensound.com/bensound-music/bensound-sweet.mp3" type="audio/mp3" />
//       </audio>
//       {/* Sparkles */}
//       {[...Array(5)].map((_, i) => (
//         <MotionBox
//           key={i}
//           position="absolute"
//           top={`${Math.random() * 100}%`}
//           left={`${Math.random() * 100}%`}
//           color="yellow.300"
//           fontSize="lg"
//           animate={{
//             opacity: [0, 1, 0],
//             scale: [0, 1, 0],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: Math.random() * 2,
//           }}
//         >
//           ✨
//         </MotionBox>
//       ))}
//       <VStack spacing={6}>
//         <Heading
//           as="h1"
//           size="2xl"
//           bgGradient="linear(to-r, #ff00ff, #00ffff)"
//           bgClip="text"
//           textShadow="0 0 10px #ff00ff"
//         >
//           Pickle’s Love Note Board 💖
//         </Heading>
//         <Text
//           fontSize={{ base: 'md', sm: 'lg' }}
//           color="pink.200"
//           textAlign="center"
//           fontStyle="italic"
//         >
//           A magical place for my dearest senpai—let’s make memories! 🥰
//         </Text>
//         <CountdownTimer />
//         <MotionBox
//           bg="gray.800"
//           p={6}
//           rounded="2xl"
//           w="full"
//           maxW="500px"
//           animation={`${glow} 2s infinite`}
//           boxShadow="0 0 20px rgba(255, 0, 255, 0.5)"
//         >
//           <VStack spacing={4}>
//             <Input
//               placeholder="Write a love note, Pickle... 🥒💕"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               bg="gray.700"
//               border="none"
//               color="white"
//               _placeholder={{ color: 'gray.400' }}
//               _focus={{ boxShadow: '0 0 5px #ff00ff' }}
//             />
//             <Select
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//               bg="gray.700"
//               border="none"
//               color="white"
//             >
//               <option value="#ffccff" style={{ backgroundColor: '#ffccff' }}>
//                 Neon Pink
//               </option>
//               <option value="#ccffcc" style={{ backgroundColor: '#ccffcc' }}>
//                 Cyber Green
//               </option>
//               <option value="#ccccff" style={{ backgroundColor: '#ccccff' }}>
//                 Electric Blue
//               </option>
//               <option value="#ffffcc" style={{ backgroundColor: '#ffffcc' }}>
//                 Star Yellow
//               </option>
//             </Select>
//             <Flex gap={4}>
//               <MotionButton
//                 bgGradient="linear(to-r, #ff00ff, #00ffff)"
//                 color="black"
//                 rounded="full"
//                 onClick={editingNote ? handleUpdateNote : handleCreateNote}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {editingNote ? 'Update Love Note' : 'Add Love Note'} 💌
//               </MotionButton>
//               {editingNote && (
//                 <MotionButton
//                   bg="gray.600"
//                   color="white"
//                   rounded="full"
//                   onClick={() => {
//                     setEditingNote(null);
//                     setMessage('');
//                     setColor('#ffccff');
//                   }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   Cancel
//                 </MotionButton>
//               )}
//             </Flex>
//             <MotionButton
//               bgGradient={isMusicPlaying ? "linear(to-r, #ff69b4, #ff00ff)" : "linear(to-r, #00ffff, #ff00ff)"}
//               color="black"
//               rounded="full"
//               onClick={toggleMusic}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {isMusicPlaying ? 'Pause Magic Music 🎶' : 'Play Magic Music 🎶'}
//             </MotionButton>
//             <MotionButton
//               bgGradient="linear(to-r, #ff69b4, #ff00ff)"
//               color="black"
//               rounded="full"
//               onClick={showLoveMessage}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               Show Love Message 💕
//             </MotionButton>
//             <MotionButton
//               bgGradient="linear(to-r, #ff00ff, #ff69b4)"
//               color="black"
//               rounded="full"
//               onClick={handleLogout}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               Logout, My Love 💖
//             </MotionButton>
//           </VStack>
//         </MotionBox>
//         <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="full">
//           {notes.length > 0 ? (
//             notes.map((note) => (
//               <NoteCard
//                 key={note._id}
//                 note={note}
//                 setNotes={setNotes}
//                 onEdit={() => startEditing(note)}
//               />
//             ))
//           ) : (
//             <Text>No notes yet! Add one above, senpai! ✨</Text>
//           )}
//         </SimpleGrid>
//       </VStack>
//       {/* Love Message Modal */}
//       <Modal isOpen={isLoveMessageOpen} onClose={() => setIsLoveMessageOpen(false)} isCentered>
//         <ModalOverlay backdropFilter="blur(5px)" />
//         <ModalContent
//           bg="gray.800"
//           color="white"
//           rounded="2xl"
//           border="2px solid"
//           borderColor="pink.200"
//           animation={`${glow} 2s infinite`}
//         >
//           <ModalHeader textAlign="center" bgGradient="linear(to-r, #ff00ff, #00ffff)" bgClip="text">
//             A Message for My Senpai 💖
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody textAlign="center" pb={6}>
//             <Text fontSize="lg" fontStyle="italic">
//               {loveMessage}
//             </Text>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </MotionBox>
//   );
// }
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Input,
  Select,
  Button,
  useToast,
  Flex,
  Text,
  keyframes,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NoteCard from './NoteCard.jsx';
import CountdownTimer from './CountTimer.jsx';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const glow = keyframes`
  0% { box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff1493; }
  50% { box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff1493; }
  100% { box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff1493; }
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

export default function NoteBoard() {
  const { token, user, notes, setNotes, fetchNotes, setToken, setUser } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('#ffccff');
  const [editingNote, setEditingNote] = useState(null); // this one store the state of the note that is being edited
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isLoveMessageOpen, setIsLoveMessageOpen] = useState(false);
  const [loveMessage, setLoveMessage] = useState('');
  const toast = useToast();

  const loveMessages = [
    "Pickle, you make my heart sparkle like a thousand stars, senpai! ",
    "Senpai, every moment with you feels like a magical anime episode! ",
    "I’m so lucky to have you, my sweet Pickle—let’s write our love story forever! ",
    "You’re my favorite person in the whole universe, senpai! ",
    "Every note I write is a piece of my heart for you, Pickle! ",
  ];

  // Fetch notes on mount
  useEffect(() => {
    if (user?._id && token) {
      fetchNotes();
    }
  }, [user, token, fetchNotes]);

  // Handle note creation
  const handleCreateNote = async () => {
    if (!message || !color) {
      toast({
        title: (
          <Flex align="center">
            <Text mr={2}>Oops, Pickle!</Text>
            <Text as="span" fontSize="xl" color="green.300" animation={`${heartBeat} 1s infinite`}>🥒</Text>
          </Flex>
        ),
        description: (
          <Flex align="center">
            <Text mr={2}>Please write a message and choose a color, senpai!</Text>
            <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
          </Flex>
        ),
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!user?._id || !token) {
      toast({
        title: 'Error',
        description: (
          <Flex align="center">
            <Text mr={2}>Please log in to create a note, my love!</Text>
            <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💕</Text>
          </Flex>
        ),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/notes/create_notes/${user._id}`,
        { message, color },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Create note response:', response.data);
      const newNote = response.data.data;
      setNotes([...notes, newNote]);
      setMessage('');
      setColor('#ffccff');
      toast({
        title: (
          <Flex align="center">
            <Text mr={2}>Love Note Added!</Text>
            <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
          </Flex>
        ),
        description: (
          <Flex align="center">
            <Text mr={2}>Your note is ready for senpai, Pickle!</Text>
            <Text as="span" fontSize="xl" color="yellow.300" animation={`${sparkleAnimation} 1s infinite`}>✨</Text>
          </Flex>
        ),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Create note error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      toast({
        title: 'Error',
        description: (
          <Flex align="center">
            <Text mr={2}>{error.response?.data?.error || 'Failed to create note, Pickle!'}</Text>
            <Text as="span" fontSize="xl" color="green.300" animation={`${heartBeat} 1s infinite`}>🥒</Text>
          </Flex>
        ),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  console.log('API URL:', process.env.REACT_APP_API_URL);
  console.log('User ID:', user._id);
//   console.log('Editing Note ID:', editingNote._id);
//   console.log('Full URL:', `${process.env.REACT_APP_API_URL}/notes/update_notes/${user._id}/${editingNote._id}`);
  // Handle note update
  const handleUpdateNote = async () => {
    if (!message || !color || !editingNote) return;
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/notes/update_notes/${user._id}/${editingNote._id}`,
        { message, color },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Update note response:', response.data);
      const updatedNote = response.data.data;
      setNotes(
        notes.map((note) =>
          note._id === editingNote._id ? { ...note, message: updatedNote.message, color: updatedNote.color } : note
        )
      );
      setMessage('');
      setColor('#ffccff');
      setEditingNote(null);
      toast({
        title: (
          <Flex align="center">
            <Text mr={2}>Love Note Updated!</Text>
            <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💕</Text>
          </Flex>
        ),
        description: (
          <Flex align="center">
            <Text mr={2}>Your note has been updated, senpai!</Text>
            <Text as="span" fontSize="xl" color="yellow.300" animation={`${sparkleAnimation} 1s infinite`}>✨</Text>
          </Flex>
        ),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Update note error:', error.response?.data || error.message);
      toast({
        title: 'Error',
        description: (
          <Flex align="center">
            <Text mr={2}>{error.response?.data?.error || 'Failed to update note, Pickle!'}</Text>
            <Text as="span" fontSize="xl" color="green.300" animation={`${heartBeat} 1s infinite`}>🥒</Text>
          </Flex>
        ),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Start editing a note
  const startEditing = (note) => {
    setEditingNote(note);
    setMessage(note.message);
    setColor(note.color);
  };

  // Handle logout
  const handleLogout = () => {
    setToken('');
    setUser(null);
    setNotes([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsMusicPlaying(false);
    toast({
      title: (
        <Flex align="center">
          <Text mr={2}>See You Soon, Senpai!</Text>
          <Text as="span" fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💕</Text>
        </Flex>
      ),
      description: (
        <Flex align="center">
          <Text mr={2}>I’ll miss you, Pickle! Come back soon!</Text>
          <Text as="span" fontSize="xl" color="yellow.300" animation={`${sparkleAnimation} 1s infinite`}>✨</Text>
        </Flex>
      ),
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Toggle background music
  const toggleMusic = () => {
    const audio = document.getElementById('background-music');
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Show a random love message
  const showLoveMessage = () => {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setLoveMessage(randomMessage);
    setIsLoveMessageOpen(true);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bgGradient="linear(to-b, #1a0033, #660066)"
      minH="100vh"
      p={6}
      color="white"
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
      {/* Background Music */}
      <audio id="background-music" loop>
        <source src="https://www.bensound.com/bensound-music/bensound-sweet.mp3" type="audio/mp3" />
      </audio>
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
      <VStack spacing={6}>
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, #ff1493, #00ffff)"
          bgClip="text"
          textShadow="0 0 15px #ff1493, 0 0 25px #00ffff"
          animation={`${pulse} 2s infinite`}
        >
          Pickle’s Love Note Board
          <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
        </Heading>
        <Text
          fontSize={{ base: 'md', sm: 'lg' }}
          color="pink.100"
          textAlign="center"
          fontStyle="italic"
          textShadow="0 0 5px #ff69b4"
        >
          A sensual haven for my dearest senpai—let’s ignite our passion! 😘
        </Text>
        <CountdownTimer />
        <MotionBox
          bg="rgba(0, 0, 0, 0.7)"
          p={6}
          rounded="2xl"
          w="full"
          maxW="500px"
          animation={`${glow} 2s infinite`}
          boxShadow="0 0 30px rgba(255, 20, 147, 0.7)"
          border="2px solid"
          borderColor="pink.200"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Write a love note, Pickle... 🥒💕"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              bg="gray.800"
              border="none"
              color="white"
              _placeholder={{ color: 'pink.300', fontStyle: 'italic' }}
              _focus={{ boxShadow: '0 0 5px #ff1493' }}
              rounded="lg"
            />
            <Select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              bg="gray.800"
              border="none"
              color="white"
              _focus={{ boxShadow: '0 0 5px #ff1493' }}
              rounded="lg"
            >
              <option value="#ffccff" style={{ backgroundColor: '#ffccff', color: 'black' }}>
                Neon Pink
              </option>
              <option value="#ccffcc" style={{ backgroundColor: '#ccffcc' , color: 'black'}}>
                Cyber Green
              </option>
              <option value="#ccccff" style={{ backgroundColor: '#ccccff', color: 'black' }}>
                Electric Blue
              </option>
              <option value="#ffffcc" style={{ backgroundColor: '#ffffcc' , color: 'black'}}>
                Star Yellow
              </option>
            </Select>
            <Flex gap={4}>
              <MotionButton
                bgGradient="linear(to-r, #ff1493, #00ffff)"
                color="white"
                rounded="full"
                onClick={editingNote ? handleUpdateNote : handleCreateNote}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px #ff1493' }}
                whileTap={{ scale: 0.9 }}
                animation={`${pulse} 1.5s infinite`}
              >
                {editingNote ? 'Update Love Note' : 'Add Love Note'}
                <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💌</Text>
              </MotionButton>
              {editingNote && (
                <MotionButton
                  bg="gray.600"
                  color="white"
                  rounded="full"
                  onClick={() => {
                    setEditingNote(null);
                    setMessage('');
                    setColor('#ffccff');
                  }}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 10px #ff69b4' }}
                  whileTap={{ scale: 0.9 }}
                >
                  Cancel
                </MotionButton>
              )}
            </Flex>
            {/* <MotionButton
              bgGradient={isMusicPlaying ? "linear(to-r, #ff69b4, #ff1493)" : "linear(to-r, #00ffff, #ff1493)"}
              color="white"
              rounded="full"
              onClick={toggleMusic}
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px #ff1493' }}
              whileTap={{ scale: 0.9 }}
              animation={`${pulse} 1.5s infinite`}
            >
              {isMusicPlaying ? 'Pause Seductive Music 🎶' : 'Play Seductive Music 🎶'}
            </MotionButton> */}
            {/* <MotionButton
              bgGradient="linear(to-r, #ff69b4, #ff1493)"
              color="white"
              rounded="full"
              onClick={showLoveMessage}
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px #ff1493' }}
              whileTap={{ scale: 0.9 }}
              animation={`${pulse} 1.5s infinite`}
            >
              Whisper a Love Message
              <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💕</Text>
            </MotionButton> */}
            <MotionButton
              bgGradient="linear(to-r, #ff1493, #ff69b4)"
              color="white"
              rounded="full"
              onClick={handleLogout}
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px #ff1493' }}
              whileTap={{ scale: 0.9 }}
              animation={`${pulse} 1.5s infinite`}
            >
              Logout, My Love
              <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
            </MotionButton>
          </VStack>
        </MotionBox>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="full">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
                onEdit={() => startEditing(note)}
              />
            ))
          ) : (
            <Text fontStyle="italic" color="pink.100" textShadow="0 0 5px #ff69b4">
              No notes yet! Add one above, senpai!
              <Text as="span" ml={2} fontSize="xl" color="yellow.300" animation={`${sparkleAnimation} 1s infinite`}>✨</Text>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
      {/* Love Message Modal */}
      <Modal isOpen={isLoveMessageOpen} onClose={() => setIsLoveMessageOpen(false)} isCentered>
        <ModalOverlay backdropFilter="blur(5px)" bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent
          bg="rgba(0, 0, 0, 0.9)"
          color="white"
          rounded="2xl"
          border="2px solid"
          borderColor="pink.200"
          animation={`${glow} 2s infinite`}
          boxShadow="0 0 30px rgba(255, 20, 147, 0.7)"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgGradient: 'radial(ellipse at center, rgba(255, 105, 180, 0.3) 0%, transparent 70%)',
            zIndex: -1,
          }}
        >
          <ModalHeader
            textAlign="center"
            bgGradient="linear(to-r, #ff1493, #00ffff)"
            bgClip="text"
            textShadow="0 0 10px #ff1493"
          >
            A Sultry Message for My Senpai
            <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💖</Text>
          </ModalHeader>
          <ModalCloseButton color="pink.200" _hover={{ color: 'pink.300' }} />
          <ModalBody textAlign="center" pb={6}>
            <Text fontSize="lg" fontStyle="italic" color="pink.100" textShadow="0 0 5px #ff69b4">
              {loveMessage}
              <Text as="span" ml={2} fontSize="xl" color="pink.300" animation={`${heartBeat} 1s infinite`}>💕</Text>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MotionBox>
  );
}