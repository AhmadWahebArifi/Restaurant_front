import React, { useEffect, useState } from "react";

const ProgressBar = ({ trigger }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (trigger) {
      setProgress(0);
      const fillTimeout = setTimeout(() => setProgress(100), 50);
      let emptyTimeout;
      if (fillTimeout) {
        emptyTimeout = setTimeout(() => setProgress(0), 800); // 700ms fill + 100ms buffer
      }
      return () => {
        clearTimeout(fillTimeout);
        clearTimeout(emptyTimeout);
      };
    } else {
      setProgress(0);
    }
  }, [trigger]);

  return (
    <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-700"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar; 