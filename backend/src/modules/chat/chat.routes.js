import { Router } from 'express';
import { auth } from '../../middlewares/auth.middleware.js';
import { ChatMessage } from './chat.model.js';

const router = Router();
router.use(auth);

router.get('/:roomId', async (req, res, next) => {
  try {
    const messages = await ChatMessage.find({ roomId: req.params.roomId })
      .populate('sender', 'fullName role')
      .sort({ createdAt: 1 })
      .limit(500);
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

export default router;
