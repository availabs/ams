import React from "react"

import { Link } from "react-router"

import Container from "./components/Container"

import resetPasswordWrapper from "../wrappers/ams-reset-password"

export default resetPasswordWrapper(({ email, verify, update, canSubmit, handleSubmit, title }) =>
  <div className="h-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-md sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">{title}</h2>
            <p className="text-lg font-thin text-gray-600">
              <span href="#" className="font-thin text-blue-400 hover:text-blue-500">
               Reset Password
              </span>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className='pt-4'>
              <label htmlFor="email" className="block text-sm font-thin text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={ e => update({ email: e.target.value }) }
                  autoComplete="email"
                  placeholder='Enter your email'
                  autoFocus
                  required
                  className="appearance-none block w-full px-3 py-2 border-b border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-thin text-gray-700">
                Verify Email
              </label>
              <div className="mt-1">
                <input
                  id="verify"
                  name="verify"
                  type="email"
                  value={verify}
                  onChange={e => update({ verify: e.target.value })}
                  autoComplete="Verify your email."
                  placeholder='Verify your email.'
                  required
                  className="appearance-none block w-full px-3 py-2 border-b border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Request Pasword
              </button>
            </div>
            
          </form>
        </div>
        <div className="flex items-center justify-between px-2 py-4">
              
          <div className="text-xs">
            Need an account?&nbsp;&nbsp; 
            <Link to='/auth/register' className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </div>

          <div className="text-xs">
            <Link to='/auth/login' className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </div>
          
        </div>
      </div>
    </div>
)
