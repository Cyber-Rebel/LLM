import React from 'react'

const AuthCard = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6">
    <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/40 p-8">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  </div>
)

export default AuthCard
