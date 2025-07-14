import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showVerifyCode, setShowVerifyCode] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
  });

  const validationSchema2 = Yup.object({
    resetCode: Yup.string().required('Verification code is required'),
  });

  function sendCode(values) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .then(({ data }) => {
        console.log(data);
        setShowVerifyCode(true);
      });
  }

  function getcode(values) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
      .then(({ data }) => {
        console.log(data);
        if (data.status === 'Success') {
          navigate('/resetPassword');
        }
      });
  }

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: validationSchema,
    onSubmit: sendCode
  });

  const formik2 = useFormik({
    initialValues: { resetCode: '' },
    validationSchema: validationSchema2,
    onSubmit: getcode
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <section className="bg-zinc-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-zinc-800 border border-zinc-700 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-orange-400 text-center mb-6">
            {showVerifyCode ? "Enter Verification Code" : "Reset Your Password"}
          </h2>

          <form
            onSubmit={showVerifyCode ? formik2.handleSubmit : formik.handleSubmit}
            className="space-y-6"
          >
            {!showVerifyCode && (
              <div>
                <label htmlFor="email" className="block text-sm text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-600 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  placeholder="name@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-400 mt-1">{formik.errors.email}</p>
                )}
              </div>
            )}

            {showVerifyCode && (
              <div>
                <label htmlFor="resetCode" className="block text-sm text-white mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="resetCode"
                  name="resetCode"
                  onChange={formik2.handleChange}
                  onBlur={formik2.handleBlur}
                  value={formik2.values.resetCode}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-600 text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  placeholder="Enter the code"
                />
                {formik2.touched.resetCode && formik2.errors.resetCode && (
                  <p className="text-sm text-red-400 mt-1">{formik2.errors.resetCode}</p>
                )}
              </div>
            )}

            <div className="flex items-start">
              <input
                id="checkbox"
                type="checkbox"
                required
                className="w-4 h-4 rounded border border-zinc-600 bg-zinc-900 focus:ring-orange-500"
              />
              <label htmlFor="checkbox" className="ml-2 text-sm text-zinc-300">
                I accept the <a href="#" className="text-orange-400 hover:underline">Terms and Conditions</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-semibold py-2.5 rounded-md transition-all duration-300"
            >
              {showVerifyCode ? "Verify Code" : "Send Code"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
