import React from 'react'
import AuthCard from '../components/AuthCard'
import FormInput from '../components/FormInput'
import PasswordInput from '../components/PasswordInput'

const Register = () => {

  return (
    <AuthCard title="Create your Cyber AI account" subtitle="Sign up to save chats, sync settings and get personalised recommendations.">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput id="firstName" label="First name" placeholder="Jane" />
          <FormInput id="lastName" label="Last name" placeholder="Doe" />
        </div>

        <FormInput id="email" label="Email" type="email" placeholder="you@example.com" />

        <PasswordInput id="password" label="Password" placeholder="Create a strong password" />

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition"
          >
            Create account
          </button>
        </div>

        <p className="text-sm text-gray-400 text-center mt-3">
          Already have an account? <a href="/login" className="text-indigo-300 underline">Login</a>
        </p>
      </form>
    </AuthCard>
  )
}

export default Register