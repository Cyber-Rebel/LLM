import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormInput from '../components/FormInput'
import PasswordInput from '../components/PasswordInput'
import { loginUser } from '../store/actions/useraction'
import { useDispatch } from 'react-redux'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    try{

    const iscorrectrepo= await  dispatch(loginUser({ 
        email: email,
        password: password
      })) 
      console.log('iscorrectrepo',iscorrectrepo) // shwow undefind because jab user correct hae tab koi repose send huava 
      if(iscorrectrepo.error){
        alert('Invalid email or password')
        return 
      }
      navigate('/')
    }catch(err){
      console.log(err)
      alert(err);
      
    }
    
  }
  
  return (
    <AuthCard title="Login to Cyber AI" subtitle="Sign in to continue your conversation with Cyber AI and access saved chats.">
      <form
        className="mt-2 space-y-6"
        onSubmit={handleSubmit}
      >
        <FormInput
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          label="Email"
          placeholder="your.email@example.com"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a5 5 0 100-10 5 5 0 000 10z" />
              <path d="M2 18a8 8 0 0116 0" />
            </svg>
          }
        />

        <PasswordInput 
          id="password" 
          label="Password" 
          placeholder="Enter your password" 
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition">
              Login
            </button>
            <Link to="/register" className="px-6 py-2 rounded-full border border-gray-700 text-indigo-300 hover:bg-gray-800 transition inline-flex items-center justify-center">
              Create account
            </Link>
          </div>
        </div>
      </form>
    </AuthCard>
  )
}

export default Login
