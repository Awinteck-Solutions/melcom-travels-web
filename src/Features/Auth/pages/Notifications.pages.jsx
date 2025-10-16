import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { updateNotificationStatus } from '../services/auth.service';
import { notifications } from '@mantine/notifications';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { user, token, updateUser } = useGlobalContext();
  
  const [notify, setNotifications] = useState({
    flightAlerts: user?.notifications?.flightAlerts,
    rideAlerts: user?.notifications?.rideAlerts,
    promotions: user?.notifications?.promotions,
    accountSecurity: user?.notifications?.accountSecurity,
    emails: user?.notifications?.emails
  });

  const notificationCategories = [
    {
      id: 'flightAlerts',
      title: 'Flight Status Updates',
      description: 'Stay informed on delays & gate changes',
      enabled: notify.flightAlerts
    },
    {
      id: 'rideAlerts',
      title: 'Ride Alerts',
      description: 'Get notified when your driver arrives.',
      enabled: notify.rideAlerts
    },
    {
      id: 'promotions',
      title: 'Promotions & Deals',
      description: 'Exclusive offers on flights, rides & hotels.',
      enabled: notify.promotions
    },
    {
      id: 'accountSecurity',
      title: 'Account & Security',
      description: 'Alerts for login & password changes.',
      enabled: notify.accountSecurity
    },
    {
      id: 'emails',
      title: 'Emails',
      description: 'Receive booking confirmations & offers.',
      enabled: notify.emails
    }
  ];

  const handleToggle = (categoryId) => {
    setNotifications(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleBack = () => {
    navigate('/profile');
  };

  const handleSaveNotifications = async () => {
    const response = await updateNotificationStatus(notify, token);
    if (response.status) {
      updateUser(response.data.user);
      notifications.show({
        title: 'Success',
        message: response.message || 'Notifications have been updated successfully.',
        color: 'green',
        position: 'top-right',
      });
    } else {
      notifications.show({
        title: 'Error',
        message: response.message || 'Failed to update notifications. Please try again.',
        color: 'red',
      });
    }
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
            {/* Notifications Card */}
            <div className="md:px-8 px-4 mb-10 relative z-10">
              {/* Header Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Notifications & Alerts
                </h1>
                <p className="text-gray-600 text-sm">
                  Manage updates your way.
                </p>
              </div>

              {/* Notification Categories */}
              <div className="space-y-0">
                {notificationCategories.map((category, index) => (
                  <div key={category.id}>
                    <div className="flex items-center justify-between py-4">
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-gray-800 font-semibold text-lg mb-1">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {category.description}
                        </p>
                      </div>

                      {/* Toggle Switch */}
                      <div className="ml-4">
                        <button
                          onClick={() => handleToggle(category.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#364A9C] focus:ring-offset-2 ${
                            category.enabled ? 'bg-[#364A9C]' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              category.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    {index < notificationCategories.length - 1 && (
                      <div className="border-t border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    // You can add API call here to save preferences
                    handleSaveNotifications();
                  }}
                  className="w-full bg-[#364A9C] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-[#364A9C] focus:ring-offset-2 outline-none"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NotificationsPage;
