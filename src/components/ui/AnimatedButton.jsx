
import React from 'react';

const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  ...props 
}) => {
  const variants = {
    primary: `
      bg-gradient-to-r from-[#FA9F36] to-[#FF6B35] 
      hover:from-[#FF6B35] hover:to-[#FA9F36]
      text-white border-0
      shadow-lg hover:shadow-xl
      transform hover:scale-105
    `,
    secondary: `
      bg-white/10 backdrop-blur-md 
      border border-white/30 text-white
      hover:bg-white/20 hover:border-white/50
      shadow-lg hover:shadow-xl
    `,
    outline: `
      border-2 border-[#FA9F36] text-[#FA9F36]
      hover:bg-[#FA9F36] hover:text-white
      shadow-lg hover:shadow-xl
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full font-semibold
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-[#FA9F36]/30
        active:scale-95
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default AnimatedButton;
