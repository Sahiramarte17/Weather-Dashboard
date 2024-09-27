import weatherRoutes from './weatherRoutes.js';
import express from 'express';
const router = express.Router();

router.use('/weather', weatherRoutes);

export default router;
