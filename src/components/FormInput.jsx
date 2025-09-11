import React from 'react'

const FormInput = ({ id, label, type = 'text', placeholder, icon, inputClass = '', onChange }) => {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <div className="mt-2 relative">
        <input
          id={id}
          name={id} 
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          required
          className={"w-full pr-12 pl-4 py-3 rounded-full border border-gray-700/60 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-lg " + inputClass}
        />
        {icon && (
          <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
        )}
      </div>
    </label>
  )
}

export default FormInput
