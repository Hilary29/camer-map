import React, { useState, useEffect } from 'react';

const CountDown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft("Les Elections sont terminées!");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      setTimeLeft(
        `${days < 0 ? "-" : ""}${Math.abs(days)} jour(s) ` +
        `${String(hours).padStart(2, '0')} hr(s) ` +
        `${String(minutes).padStart(2, '0')} min(s)`
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <p className="p-2 bg-red-900 text-white-50 rounded-sm">
      {timeLeft}
    </p>
  );
};

export default CountDown;
