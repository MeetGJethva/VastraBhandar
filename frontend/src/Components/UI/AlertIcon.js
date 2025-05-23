import { useState, useEffect } from 'react';

const AlertIcon = ({ type }) => {
  const iconProps = {
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2",
    className: "shrink-0"
  };

  switch (type) {
    case 'success':
      return (
        <svg {...iconProps}>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      );
    case 'error':
      return (
        <svg {...iconProps}>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      );
    case 'warning':
      return (
        <svg {...iconProps}>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      );
    case 'info':
      return (
        <svg {...iconProps}>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      );
    default:
      return null;
  }
};

const CloseIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const CustomAlert = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  show = true 
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    
    if (show && duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const alertStyles = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  };

  const textStyles = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    info: 'text-blue-800 dark:text-blue-200'
  };

  const buttonStyles = {
    success: 'bg-green-600 hover:bg-green-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 text-white'
  };

  return (
    <div
      role="alert"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
        ${alertStyles[type]} border rounded-lg shadow-lg`}
    >
      <div className="relative">
        <div className="flex items-start gap-3 p-6">
          <AlertIcon type={type} />
          
          <div className={`flex-1 text-base ${textStyles[type]}`}>
            {message}
          </div>

          <button
            onClick={handleClose}
            className={`shrink-0 ${textStyles[type]} opacity-70 hover:opacity-100 transition-opacity`}
            aria-label="Close alert"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex justify-end p-4 pt-0">
          <button
            onClick={handleClose}
            className={`px-4 py-2 rounded-md text-sm font-medium ${buttonStyles[type]} transition-colors duration-200`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;