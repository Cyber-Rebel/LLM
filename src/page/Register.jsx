// RegisterSimple.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/actions/useraction.jsx';

const RegisterSimple = () => {
  const dispacth = useDispatch()
  const navigate = useNavigate(); // use for redirect after success if you want
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit =async (data) => {
   const datas = {
    fullName:{
      firstName:data?.firstName,
      lastName:data?.lastName
    },
    email:data?.email,
    password:data?.password,
    gender:data?.gender
    }
console.log(datas)
 const iscorrectrepo = await dispacth(registerUser(datas))

 console.log('iscorrectrepo',iscorrectrepo) // shwow undefind because jab user correct hae tab koi repose send huava 


      if(iscorrectrepo.error){
        console.log(iscorrectrepo)
        alert('Invalid Register cheak details ')
        return 
      }
      navigate('/')

    reset()
   }



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0d] p-4">
      <div className="max-w-xl w-full bg-[#121214] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-white mb-1">Create your Cyber AI account</h2>
        <p className="text-sm text-gray-400 mb-6">
          Sign up to save chats, sync settings and get personalised recommendations.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-300 mb-1">First name</label>
              <input
                id="firstName"
                {...register('firstName', { required: 'First name is required' })}
                placeholder="Jane"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
              />
              {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm text-gray-300 mb-1">Last name</label>
              <input
                id="lastName"
                {...register('lastName', { required: 'Last name is required' })}
                placeholder="Doe"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
              />
              {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' }
              })}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              placeholder="Create a strong password"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  value="male"
                  {...register('gender',{required:true} )}
                  className="form-radio"
                />
                Male
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  value="female"
                  {...register('gender',{required:true  } )}
                  className="form-radio"
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-xs text-red-400 mt-1">{errors.gender.message}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Create account'}
            </button>
          </div>

          <p className="text-sm text-gray-400 text-center mt-3">
            Already have an account? <a href="/login" className="text-indigo-300 underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterSimple;
