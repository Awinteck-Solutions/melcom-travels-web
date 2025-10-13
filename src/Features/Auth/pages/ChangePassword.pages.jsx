import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from '../../../context';
import Container from '../../../components/Container';
import Header from '../../../components/Header';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const { user } = useGlobalContext();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required('Current password is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            )
            .required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Please confirm your new password')
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                // Simulate API call to change password
                console.log('Changing password for user:', user?.email);
                console.log('Current password:', values.currentPassword);
                console.log('New password:', values.newPassword);

                // For demo purposes, simulate successful password change
                setTimeout(() => {
                    setShowSuccess(true);
                    setIsLoading(false);

                    // Clear form
                    formik.resetForm();

                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 3000);
                }, 1000);

            } catch (error) {
                console.error('Error changing password:', error);
                setIsLoading(false);
            }
        }
    });

    const handleBack = () => {
        navigate('/profile');
    };

    return (
        <Container>
            {/* Header */}
            <Header currentPage="flights" />
            <div className='relative'>
                <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
                    <img src="/contact-dots.svg" alt="stars" className="md:w-1/2 w-4/5 m-auto object-cover" />
                </div>
            </div>

            <div className='md:mx-20 mx-4 rounded-3xl border mb-5 overflow-hidden h-fit'>
                {/* Back Button */}
                <div className="flex items-center m-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                <div className="bg-white flex justify-center md:px-4">
                    <div className="w-full max-w-md">
                        {/* Change Password Card */}
                        <div className="md:px-8 px-4 mb-10 relative z-10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">Change Password</h1>
                                <p className="text-gray-600 text-sm">
                                    Create a new password to secure your account.
                                </p>
                            </div>

                            {/* Change Password Form */}
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                {/* Current Password Field */}
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            id="currentPassword"
                                            name="currentPassword"
                                            value={formik.values.currentPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your current password"
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500 pr-12"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showCurrentPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {formik.touched.currentPassword && formik.errors.currentPassword && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.currentPassword}</p>
                                    )}
                                </div>

                                {/* New Password Field */}
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            id="newPassword"
                                            name="newPassword"
                                            value={formik.values.newPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your new password"
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500 pr-12"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showNewPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {formik.touched.newPassword && formik.errors.newPassword && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.newPassword}</p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Confirm your new password"
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500 pr-12"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Change Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#364A9C] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-[#364A9C] focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Changing...' : 'Change'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Notification */}
            {showSuccess && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center space-x-3 transform transition-all duration-300 ease-in-out translate-x-0 opacity-100">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                Your password has been changed successfully.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ChangePasswordPage;
