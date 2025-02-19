import  express from 'express';
import { handleClick } from '../controllers/price.controllers.js';
const router=express.Router();
router.post('/api/click', async (req, res) => {
    console.log("i am being hit")
  try {
    const result = await handleClick(req.body.userId);
    console.log(result,"the result")
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});
export default router;