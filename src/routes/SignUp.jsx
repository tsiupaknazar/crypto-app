import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'

import { UserAuth } from '../context/AuthContext'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password)
      navigate('/account')
    } catch (err) {
      setError(err.code);
    }
  }

  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 bg-primary border border-input rounded-2xl'
                type="email"
              />
              <AiOutlineMail className='absolute right-2 top-4 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-3 bg-primary border border-input rounded-2xl'
                type="password"
              />
              <AiFillLock className='absolute right-2 top-4 text-gray-400' />
            </div>
          </div>
          {error ? <p className='text-red-500 p-3 my-2'>Error: {error.slice(5)}</p> : null}
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign up</button>
        </form>
        <p className='my-4'>Already have an account? <Link className='text-accent' to="/signin">Sign in here</Link></p>
      </div>
    </div>
  )
}

export default SignUp