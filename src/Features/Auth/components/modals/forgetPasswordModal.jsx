import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const ForgetPasswordModal = ({ onSubmit, onClose, isLoading }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.email);
    }
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-600 text-sm">
          Enter your email address and we'll send you a verification code to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
            disabled={isLoading}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#364A9C] text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-[#364A9C] focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Code'}
          </button>
        </div>
      </form>

      {/* Back to Login */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <button
            type="button"
            onClick={onClose}
            className="text-[#364A9C] hover:text-blue-700 font-medium transition-colors"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};