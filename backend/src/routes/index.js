import { Router } from 'express';
import notesRouter from './notes.js';
import authRouter from './auth.js';

const router = Router();

// Mount the routers
router.use('/notes', notesRouter); // All note routes will start with /notes
router.use('/auth', authRouter);   // All auth routes will start with /auth

export default router;
