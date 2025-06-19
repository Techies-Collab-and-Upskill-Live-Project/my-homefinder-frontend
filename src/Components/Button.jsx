// Button.jsx
import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  size = "medium",
  className = "",
  disabled = false,
  fullWidth = false,
  ...props 
}) {
  // Define variant classes
  const variantClasses = {
    primary: "bg-[#0A620A] hover:bg-green-700 text-white",
    secondary: "bg-black text-white rounded-lg",
    success: "bg-green-500 rounded-3xl hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "bg-transparent border-1 rounded-3xl border-green-600 text-white-600 hover:bg-green-600 hover:border-white-500"
  };

  // Define size classes
  const sizeClasses = {
    small: "py-1 px-3 text-sm",
    medium: "py-1 px-4 w-full text-base",
    large: "py-3 px-6 text-lg",
    cont: "w-full h-12 text-lg"
  };

  // Base classes
  const baseClasses = "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Disabled class
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}