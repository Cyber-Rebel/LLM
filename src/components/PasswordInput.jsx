import React, { useState } from 'react'

const PasswordInput = ({ id, label, placeholder, icon, onChange }) => {
  const [visible, setVisible] = useState(false)
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <div className="mt-2 relative">
        <input
          onChange={onChange}
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          required
          className="w-full pr-12 pl-4 py-3 rounded-full border border-gray-700/60 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-lg"
        />
        {icon && (
          <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
        )}

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 p-1 rounded hover:bg-gray-800/40"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.523 0-10-4.477-10-10 0-1.02.156-2.006.45-2.93" />
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </label>
  )
}

export default PasswordInput
