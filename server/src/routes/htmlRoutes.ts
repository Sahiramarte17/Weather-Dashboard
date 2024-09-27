import express, {type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// TODO: Define route to serve index.html
router.get('/', (_req: Request, res: Response) => {
 res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

router.get('/weather', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../client/dist/weather.html'));
   });
   


export default router;
