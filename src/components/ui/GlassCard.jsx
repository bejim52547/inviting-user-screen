
import React from 'react';

const GlassCard = ({ children, className = '', blur = 'md' }) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  return (
    <div className={`
      bg-white/10 ${blurClasses[blur]} 
      border border-white/20 rounded-2xl 
      shadow-2xl hover:shadow-3xl 
      transition-all duration-500 ease-out
      hover:-translate-y-1 hover:bg-white/15
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
