import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessAlertProps {
  message: string;
  onClose: () => void;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger fade-in animation
    const timer = setTimeout(() => {
      handleClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Allow time for fade-out animation
  };

  return (
    <div className={`fixed top-24 right-5 z-[100] transition-all duration-300 ease-in-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
      <div className="bg-white border border-green-300 text-gray-800 font-semibold rounded-lg shadow-lg p-4 flex items-center space-x-3">
        <CheckCircle className="w-6 h-6 text-green-500" />
        <span>{message}</span>
        <button onClick={handleClose} className="ml-4 p-1 rounded-full hover:bg-gray-100">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default SuccessAlert;
