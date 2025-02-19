//user routes for the user details and score

import  express from 'express';
import { User } from '../model/user.schema.js'; 
const router=express.Router();
router.get('/api/user/:userId', async (req, res) => {
    const user = await User.findOne({ userId: req.params.userId });
    console.log(user);
    res.json(user || { score: 0, prizes: 0 });
  });

 export default router;