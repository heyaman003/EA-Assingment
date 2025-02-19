import { User } from '../model/user.schema.js';

export const handleClick = async (userId) => {
    const user = await User.findOneAndUpdate(
      { userId },
      { $inc: { score: 1 } },
      { new: true, upsert: true }
    );
  
    let pointsEarned = 1;
    let prizeWon = false;
    
    if (Math.random() < 0.5) {
      pointsEarned = 10;
      await User.updateOne({ userId }, { $inc: { score: 9 } });
    }
  
    if (Math.random() < 0.25) {
      await User.updateOne({ userId }, { $inc: { prizes: 1 } });
      prizeWon = true;
    }
  
    const updatedUser = await User.findOne({ userId });
    return {
      pointsEarned,
      prizeWon,
      score: updatedUser.score,
      prizes: updatedUser.prizes
    };
  };
  