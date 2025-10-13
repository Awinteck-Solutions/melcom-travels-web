import React, { useState } from 'react';
import { ForgetPasswordModal } from './modals/forgetPasswordModal';
import { VerifyOtpModal } from './modals/verifyOtpModal';
import { ResetPasswordModal } from './modals/resetPasswordModal';

const ForgotPassword = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (emailData) => {
    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      console.log('Sending OTP to:', emailData);
      setEmail(emailData);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (otpData) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      console.log('Verifying OTP:', otpData);
      setOtp(otpData);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (passwordData) => {
    setIsLoading(true);
    try {
      // Simulate API call to reset password
      console.log('Resetting password for:', email, 'with new password');
      // Reset all state and close modal
      setCurrentStep(1);
      setEmail('');
      setOtp('');
      onClose();
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // Reset all state when closing
    setCurrentStep(1);
    setEmail('');
    setOtp('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {currentStep === 1 && (
          <ForgetPasswordModal
            onSubmit={handleEmailSubmit}
            onClose={handleClose}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 2 && (
          <VerifyOtpModal
            email={email}
            onSubmit={handleOtpSubmit}
            onBack={handleBack}
            onClose={handleClose}
            isLoading={isLoading}
          />
        )}
        
        {currentStep === 3 && (
          <ResetPasswordModal
            email={email}
            onSubmit={handlePasswordReset}
            onBack={handleBack}
            onClose={handleClose}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
