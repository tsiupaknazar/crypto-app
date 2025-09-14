import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { getErrorMessage } from '../helpers/firebaseAuthErrors';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithGithub, signInWithFacebook } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/account')
    } catch (e) {
      const errorCode = e.code;
      const errorMessage = getErrorMessage(errorCode);
      setError(errorMessage);
    }
  };

  const handleProviderSignIn = async (providerFn, label) => {
    setError('');
    try {
      await providerFn();
      navigate('/account');
    } catch (error) {
      setError(`${label} sign-in failed: ${error.message}`);
      console.log(error);
    }
  }

  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='email'
                required
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <div className='flex items-center justify-between'>
              <label>Password</label>
              <Link to="/reset-password" className='text-accent'>Forgot password?</Link>
            </div>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='password'
                title="Password must contain: Minimum 8 characters at least 1 Alphabet and 1 Number"
                required pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>
            Sign in
          </button>
          {error && <p className='text-red-700'>Error: {error/*.slice(22/*, error.length - 2)*/}</p>}
        </form>
        <p className='my-2 text-center'>
          or sign in with
        </p>
        <div className='flex items-center justify-between mb-4 text-center gap-5'>
          <button
            className="flex items-center justify-center w-[50%] p-4 bg-button text-btnText font-[500] rounded-2xl"
            onClick={() => handleProviderSignIn(signInWithGoogle, "Google")}
          >
            <FaGoogle />
            {/* Sign In With Google */}
          </button>
          <button
            className="flex items-center justify-center w-[50%] p-4 bg-button text-btnText font-[500] rounded-2xl"
            onClick={() => handleProviderSignIn(signInWithGithub, "Github")}
          >
            <FaGithub />
            {/* Sign In With Github */}
          </button>
          <button
            className="flex items-center justify-center w-[50%] p-4 bg-button text-btnText font-[500] rounded-2xl"
            onClick={() => handleProviderSignIn(signInWithFacebook, "Facebook")}
          >
            <FaFacebook />
            {/* Sign In With Github */}
          </button>
        </div>
        <p className='my-4'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-accent'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
