
import React from 'react';

const FloatingElement = ({ children, delay = 0, className = '' }) => {
  return (
    <div 
      className={`
        animate-float
        ${className}
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
