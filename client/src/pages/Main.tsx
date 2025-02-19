// App.tsx
import React, { useState, useEffect } from 'react';
type GameData = {
  score: number;
  prizes: number;
};

type FeedbackMessage = string;

const Main: React.FC = () => {
  const [userId] = useState<string>(() => localStorage.getItem('userId') || crypto.randomUUID());
  const [gameData, setGameData] = useState<GameData>({ score: 0, prizes: 0 });
  const [feedback, setFeedback] = useState<FeedbackMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('userId', userId);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/${userId}`)
      .then((res) => res.json())
      .then((data: GameData) => setGameData({ score: data.score || 0, prizes: data.prizes || 0 }))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleClick = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();
      setGameData({ score: result.score, prizes: result.prizes });

      const newFeedback: FeedbackMessage[] = [];
      if (result.pointsEarned === 10) newFeedback.push('+10 Points!');
      if (result.prizeWon) newFeedback.push('Prize Unlocked!');
      setFeedback(newFeedback);

      setTimeout(() => setFeedback([]), 2000);
    } catch (error) {
      console.error('Error handling click:', error);
    }
  };

  return (
    <div className="container">
      <div className="stats">
        <h2>Score: {gameData.score}</h2>
        <h2>Prizes: {gameData.prizes}</h2>
      </div>

      <button
        className="clicker"
        onClick={handleClick}
        onMouseDown={(e) => (e.target as HTMLButtonElement).classList.add('clicking')}
        onMouseUp={(e) => (e.target as HTMLButtonElement).classList.remove('clicking')}
      >
        CLICK ME!
      </button>

      <div className="feedback">
        {feedback.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default Main;