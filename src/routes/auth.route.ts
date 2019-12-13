import { Router } from 'express';

const route:Router = Router();

import { signin, signup, profile } from '../controllers/auth.controllers';
import { validateToken } from '../middleware/auth';

route.post('/auth/signup', signup);
route.post('/auth/signin', signin);
route.get('/auth/profile', validateToken , profile);

export default route;