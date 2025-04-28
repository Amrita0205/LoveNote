import {Router} from 'express';
import {getNotes,createNote,deleteNote,updateNote} from '../controllers/index.js';
import { auth } from '../middleware/auth.js';
const router=Router();
router.get('/get_notes/:userId',auth,getNotes);
router.post('/create_notes/:userId',auth,createNote);
router.delete('/delete_notes/:userId/:noteId',auth,deleteNote);
router.patch('/update_notes/:userId/:noteId',auth,updateNote);

export default router;