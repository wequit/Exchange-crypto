import React from 'react'

type InputProps = {
  label?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  className?: string
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  value, 
  onChange, 
  readOnly = false,
  className = '',
  placeholder = '0.0'
}) => (
  <div className={`flex flex-col w-full ${className}`}>
    {label && (
      <label className="text-sm text-gray-400 mb-1.5 font-medium">
        {label}
      </label>
    )}
    <input
      type="text"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`
        w-full bg-gray-800/70 text-white p-3 rounded-lg
        border border-gray-700 hover:border-cyan-400/30
        focus:outline-none focus:ring-2 focus:ring-cyan-500/30
        transition-all duration-200
        ${readOnly ? 'text-blue-400 cursor-default' : ''}
        text-lg font-medium
      `}
    />
  </div>
)