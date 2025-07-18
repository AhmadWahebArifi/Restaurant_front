import { useEffect, useState } from "react";

const SuccessCard = ({
  message = "Customer added successfully!",
  duration = 2000,
  onClose,
  inPage = false,
}) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const fillTimeout = setTimeout(() => setProgress(100), 50);
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);
    return () => {
      clearTimeout(timer);
      clearTimeout(fillTimeout);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`$ {
        inPage
          ? "w-full max-w-2xl mx-auto mt-4"
          : "fixed top-8 left-1/2 z-50 transform -translate-x-1/2"
      } transition-all duration-500 ${
        show ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 shadow text-green-900 text-sm font-medium animate-bounce-in relative">
        <svg
          className="w-4 h-4 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {message}
        {/* Progress bar at the bottom */}
        <div className="absolute left-0 bottom-0 w-full h-0.5 bg-green-200 rounded-b overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all duration-[2000ms]"
            style={{ width: `${progress}%`, transitionDuration: `${duration}ms` }}
          ></div>
        </div>
      </div>
      <style>
        {`
          @keyframes bounce-in {
            0% { transform: scale(0.8) translateY(-30px); opacity: 0; }
            60% { transform: scale(1.05) translateY(10px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          .animate-bounce-in {
            animation: bounce-in 0.5s cubic-bezier(.68,-0.55,.27,1.55);
          }
        `}
      </style>
    </div>
  );
};

export default SuccessCard;
