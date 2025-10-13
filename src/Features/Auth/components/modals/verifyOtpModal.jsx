import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export function VerifyOtpModal({
  email,
  onSubmit,
  onBack,
  onClose,
  isLoading
}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(4, 'OTP must be 4 digits')
      .matches(/^\d{4}$/, 'OTP must contain only numbers')
      .required('OTP is required')
  });

  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.otp);
    }
  });

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Update formik value
    formik.setFieldValue('otp', newOtp.join(''));
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    formik.setFieldValue('otp', newOtp.join(''));
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  // Auto-submit when all 4 digits are entered
  useEffect(() => {
    if (otp.every(digit => digit !== '') && otp.join('').length === 4) {
      formik.setFieldValue('otp', otp.join(''));
      // Auto-submit after a short delay
      setTimeout(() => {
        if (formik.isValid) {
          formik.submitForm();
        }
      }, 500);
    }
  }, [otp]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
        <p className="text-gray-600 text-sm">
          We've sent a 4-digit verification code to
        </p>
        <p className="text-[#364A9C] font-medium">{email}</p>
      </div>

      {/* OTP Input */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Enter Verification Code
          </label>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all bg-gray-100"
                disabled={isLoading}
              />
            ))}
          </div>
          {formik.touched.otp && formik.errors.otp && (
            <p className="mt-2 text-sm text-red-600 text-center">{formik.errors.otp}</p>
          )}
        </div>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              className="text-[#364A9C] hover:text-blue-700 font-medium transition-colors"
              disabled={isLoading}
            >
              Resend Code
            </button>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#364A9C] text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-[#364A9C] focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || otp.join('').length !== 4}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      </form>

      {/* Close */}
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}