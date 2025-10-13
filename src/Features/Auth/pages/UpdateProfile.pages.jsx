import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from '../../../context';
import Container from '../../../components/Container';
import Header from '../../../components/Header';

const UpdateProfilePage = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useGlobalContext();
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required'),
        lastName: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required')
    });

    const formik = useFormik({
        initialValues: {
            firstName: user?.name?.split(' ')[0] || '',
            lastName: user?.name?.split(' ').slice(1).join(' ') || '',
            email: user?.email || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                // Simulate API call to update profile
                console.log('Updating profile:', values);

                // Update user in global context
                const updatedUser = {
                    ...user,
                    name: `${values.firstName} ${values.lastName}`,
                    email: values.email
                };

                // For demo purposes, we'll just show success
                setTimeout(() => {
                    setShowSuccess(true);
                    setIsLoading(false);

                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 3000);
                }, 1000);

            } catch (error) {
                console.error('Error updating profile:', error);
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

                    <div className="w-full max-w-xl">
                        {/* Update Profile Card */}
                        <div className="md:px-8 px-4 mb-10 relative z-10">


                            {/* Profile Information Section */}
                            <div className="text-center mb-8">
                                {/* Profile Picture */}
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 bg-[#364A9C] rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {/* Edit Icon */}
                                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-300 transition-colors">
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* User Name */}
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                    {user?.name || 'Honya Bright'}
                                </h1>

                                {/* User Email */}
                                <p className="text-gray-600 text-sm">
                                    {user?.email || 'Honyabright4278@gmail.com'}
                                </p>
                            </div>

                            {/* Update Form */}
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="First name"
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                                            disabled={isLoading}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Last name"
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                                            disabled={isLoading}
                                        />
                                        {formik.touched.lastName && formik.errors.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Example@email.com"
                                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#364A9C] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-500"
                                        disabled={isLoading}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                                    )}
                                </div>

                                {/* Edit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#364A9C] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-[#364A9C] focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Edit'}
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
                                Your profile has been updated successfully.
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

export default UpdateProfilePage;
