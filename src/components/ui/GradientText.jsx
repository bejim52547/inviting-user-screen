
import React from 'react';

const GradientText = ({ children, className = '' }) => {
  return (
    <span className={`
      bg-gradient-to-r from-[#FA9F36] via-[#FF6B35] to-[#FF8A50]
      bg-clip-text text-transparent
      animate-gradient
      ${className}
    `}>
      {children}
    </span>
  );
};

export default GradientText;
