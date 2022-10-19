import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { resetPassword } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await resetPassword(email);
            setSuccess("Email with reset link was sent. Check your inbox!")
        } catch (e) {
            setError(e.message);
            alert(e.message);
        }
    };

    return (
        <div>
            <div className='max-w-[400px] mx-auto min-h-[300px] px-4 py-20'>
                <h1 className='text-2xl font-bold'>Reset Password</h1>
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

                    <button
                        className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
                        onClick={handleSubmit}
                    >
                        Send email
                    </button>
                    {success && <p className='text-red-700'>{success}</p>}
                    {error && <p className='text-red-700'>{error}</p>}
                </form>
                {/*<p className='my-4'>
                    Don't have an account?{' '}
                    <Link to='/signup' className='text-accent'>
                        Sign up
                    </Link>
                   </p>*/}
            </div>
        </div>
    )
}

export default ResetPassword