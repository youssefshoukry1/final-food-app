import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext/UserContext';
import * as Yup from 'yup';
import { Helmet } from "react-helmet";

export default function Register() {
  let { setLogin } = useContext(UserContext);
  const [apiError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();

  function handleRegister(formsData) {
    setLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formsData)
      .then((response) => {
        if (response.data.message === 'success') {
          localStorage.setItem('userToken', response.data.token);
          setLogin(response.data.token);
          setLoading(false);
          navigate('/login');
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'min length is 3').max(10, 'max length is 10'),
    email: Yup.string().required('email is required').email('enter a valid email'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,7}$/, 'min 6, max 8, starts with capital'),
    rePassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')], 'passwords must match'),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-zinc-900">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-zinc-800 shadow-lg rounded-xl p-8 border border-zinc-700">
            <h2 className="text-center text-3xl font-bold tracking-tight text-orange-400 mb-6">
              Register Now
            </h2>

            {apiError && (
              <div className="p-3 mb-4 text-sm text-red-400 rounded-md bg-zinc-700 border border-red-500">
                <span className="font-medium">{apiError}</span>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="usName" className="block text-sm font-medium text-gray-300">Username</label>
                <input
                  id="usName"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="mt-2 block w-full rounded-md bg-zinc-900 border border-zinc-600 text-white px-3 py-2 shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:text-sm"
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="mt-2 text-sm text-red-400">{formik.errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="mt-2 block w-full rounded-md bg-zinc-900 border border-zinc-600 text-white px-3 py-2 shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:text-sm"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="mt-2 text-sm text-red-400">{formik.errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="mt-2 block w-full rounded-md bg-zinc-900 border border-zinc-600 text-white px-3 py-2 shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:text-sm"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="mt-2 text-sm text-red-400">{formik.errors.password}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="rePassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  id="rePassword"
                  name="rePassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                  className="mt-2 block w-full rounded-md bg-zinc-900 border border-zinc-600 text-white px-3 py-2 shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:text-sm"
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className="mt-2 text-sm text-red-400">{formik.errors.rePassword}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="mt-2 block w-full rounded-md bg-zinc-900 border border-zinc-600 text-white px-3 py-2 shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:text-sm"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <div className="mt-2 text-sm text-red-400">{formik.errors.phone}</div>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="transition-all duration-500 ease-in-out w-full inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <span className="text-lg">Register</span>
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
    </>
  );
}
