import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Box,
  Text,
  IconButton,
  useToast,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);
const MotionText = motion(Text);

// Updated glow animation to match NoteBoard
const glow = keyframes`
  0% { box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff1493; }
  50% { box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff1493; }
  100% { box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff1493; }
`;

export default function NoteCard({ note, setNotes, onEdit }) {
  const { token, user } = useContext(AuthContext);
  const toast = useToast();

  const deleteNote = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/notes/delete_notes/${user._id}/${note._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
      toast({
        title: 'Success',
        description: 'Note deleted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Delete note error:', error.response?.data || error.message);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to delete note.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MotionBox
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      bg={note.color}
      p={5}
      pt={8} // Add padding-top to make space for the buttons
      rounded="2xl"
      shadow="lg"
      position="relative"
      minW="150px"
      maxW="250px"
      minH="150px"
      animation={`${glow} 2s infinite`} // Apply the updated glow animation
      border="1px solid" // Add a subtle border for depth
      borderColor="rgba(255, 255, 255, 0.2)"
      whileHover={{ 
        scale: 1.05, 
        rotate: 1,
        boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)", // Slightly stronger shadow on hover
      }}
      whileTap={{ scale: 0.9 }}
      fontFamily="'Orbitron', sans-serif"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("https://www.transparenttextures.com/patterns/stardust.png") repeat',
        opacity: 0.1,
        zIndex: -1,
      }}
    >
      <MotionIconButton
        size="xs"
        bg="orange.400" // Orange "X" button as in the screenshot
        color="white"
        position="absolute"
        top={2}
        right={10}
        rounded="full"
        whileHover={{ scale: 1.2, boxShadow: "0 0 8px rgba(255, 165, 0, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        onClick={deleteNote}
        icon={<CloseIcon />}
      />
      <MotionIconButton
        icon={<EditIcon />}
        size="xs"
        colorScheme="purple" // Purple pencil button as in the screenshot
        position="absolute"
        top={2}
        right={2}
        rounded="full"
        whileHover={{ scale: 1.2, boxShadow: "0 0 8px rgba(128, 0, 128, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        onClick={onEdit}
      />
      <MotionText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        fontSize={{ base: 'sm', sm: 'md' }}
        color="gray.900"
        fontWeight="bold"
        textShadow="0 0 5px rgba(255, 255, 255, 0.5)"
        lineHeight="1.5" // Better readability
        wordBreak="break-word" // Ensure long text wraps properly
        textAlign="center" // Center the text for a balanced look
      >
        {note.message}
      </MotionText>
    </MotionBox>
  );
}