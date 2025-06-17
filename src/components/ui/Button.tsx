import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full px-6 py-3 rounded-xl font-bold transition-all duration-300
      bg-gradient-to-r from-cyan-500 to-blue-600 
      hover:from-cyan-600 hover:to-blue-700 
      active:scale-[0.98] 
      disabled:opacity-50 disabled:cursor-not-allowed
      shadow-lg hover:shadow-cyan-500/20
      text-white
      ${className}
    `}
  >
    {children}
  </button>
)