import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div>
            <div className='max-w-[400px] mx-auto min-h-[300px] px-4 py-20'>
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-btnText text-9xl text-red-500">404</h1>

                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Page not found</span>
                    </h6>

                    <p className="mb-6 text-center text-gray-500 md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-2 text-sm font-semibold bg-button text-btnText rounded-2xl shadow-xl"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage