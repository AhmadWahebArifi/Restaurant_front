import { useEffect, useState } from "react";

const SuccessCard = ({
  message = "Customer added successfully!",
  duration = 2000,
  onClose,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-8 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${
        show
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 rounded-lg bg-green-500 px-6 py-4 shadow-lg text-white text-base font-semibold animate-bounce-in">
        <svg
          className="w-6 h-6 text-white"
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
