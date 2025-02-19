import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  score: { type: Number, default: 0 },
  prizes: { type: Number, default: 0 }
});

export const User = mongoose.model('User', UserSchema);
