import React, {  useContext, useState } from 'react'
import UserContext from '../../context/userContext/UserContext'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  let {setLogin} = useContext(UserContext)
  const[apiError, setError] = useState('')
  const [ isLoading, setLoading ] = useState('')
  const navigate = useNavigate()

function handleLogin(formsData){
  setLoading(true)

  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formsData)
  .then((res)=>{console.log('success',res)
    if(res.data.message == 'success'){
      localStorage.setItem('userToken', res?.data?.token)
      setLogin(res?.data?.token)
            setLoading(false)          
            navigate('/')
    }
    ;})
  .cath(()=>{})
}

let validationSchema = Yup.object({

    email:Yup.string().required('email is required').email('enter availed email'),
    password:Yup.string().required('passowrd is required').matches(/^[A-Z][a-z0-9]{5,7}$/,' min length is 5 and max length is 8 and start with capital '),
});

    let formik = useFormik({
    initialValues: {
        email: "",
        password: "",
    },
        validationSchema:validationSchema
        ,
    onSubmit:handleLogin
    });


return (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-zinc-900">
    <div className="w-full max-w-md space-y-8">
      <div className="bg-zinc-800 shadow-lg rounded-xl p-8 border border-zinc-700">
        <h2 className="text-center text-3xl font-bold tracking-tight text-orange-400 mb-6">
          Login Now
        </h2>

        {apiError && (
          <div className="p-3 mb-4 text-sm text-red-400 rounded-md bg-zinc-700 border border-red-500">
            <span className="font-medium">{apiError}</span>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="ur-email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              id="ur-email"
              type="email"
              autoComplete="email-address"
              required
              className="mt-2 block w-full rounded-md bg-zinc-900 border border-zinc-600 text-white px-3 py-2 shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:text-sm"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="mt-2 text-sm text-red-400">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              id="password"
              type="password"
              autoComplete="password"
              required
              className="mt-2 block w-full rounded-md bg-zinc-900 border border-zinc-600 text-white px-3 py-2 shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:text-sm"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="mt-2 text-sm text-red-400">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="transition-all duration-500 ease-in-out w-full inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <span className="text-lg">Login</span>
              {isLoading && <i className="fa fa-spinner fa-spin ml-3"></i>}
            </button>

            <p className="mt-4 text-sm text-gray-400 text-center">
              <Link to="/forgotpassord" className="hover:underline text-orange-400">
                Forgot Password?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}
