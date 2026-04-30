import { Router } from 'express';
import { helloController } from '../controllers';

const router = Router();

router.get('/hello', helloController);

export default router;
