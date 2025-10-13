import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import Container from '../../../components/Container';
import Header from '../../../components/Header';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useGlobalContext();
  const [showEditProfile, setShowEditProfile] = useState(false);

  const profileMenuItems = [
    {
      id: 'my-profile',
      title: 'My Profile',
      description: 'Update your travel details, preferences, and personal info anytime.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M15.5 8a5 5 0 1 0-10 0a5 5 0 0 0 10 0"/><path d="M3.5 20A7 7 0 0 1 14 13.937m6.189.997l-.623-.623a1.063 1.063 0 0 0-1.503 0l-3.349 3.35a3.2 3.2 0 0 0-.872 1.628L13.5 21l1.71-.342a3.2 3.2 0 0 0 1.63-.872l3.349-3.349a1.063 1.063 0 0 0 0-1.503"/></g></svg>
      ),
      onClick: () => navigate('/update-profile')
    },
    {
      id: 'my-bookings',
      title: 'My Bookings',
      description: 'View and manage your flight, ride, and hotel reservations in one place.',
      icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M19 10.5V10c0-3.771 0-5.657-1.172-6.828S14.771 2 11 2S5.343 2 4.172 3.172S3 6.229 3 10v4.5c0 3.287 0 4.931.908 6.038q.25.304.554.554C5.57 22 7.212 22 10.5 22M7 7h8m-8 4h4"/><path d="m18 18.5l-1.5-.55V15.5m-4.5 2a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0"/></g></svg>
      ),
      onClick: () => navigate('/bookings')
    },
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Update your login security anytime.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12.75 10a.75.75 0 0 0-1.5 0v.701l-.607-.35a.75.75 0 0 0-.75 1.298l.607.35l-.607.351a.75.75 0 1 0 .75 1.3l.607-.351V14a.75.75 0 0 0 1.5 0v-.7l.607.35a.75.75 0 0 0 .75-1.3L13.5 12l.607-.35a.75.75 0 0 0-.75-1.3l-.607.35zm-6.017-.75a.75.75 0 0 1 .75.75v.7l.606-.35a.75.75 0 0 1 .75 1.3l-.607.35l.607.35a.75.75 0 1 1-.75 1.3l-.606-.35v.7a.75.75 0 0 1-1.5 0v-.701l-.608.35a.75.75 0 0 1-.75-1.298L5.232 12l-.607-.35a.75.75 0 1 1 .75-1.3l.608.351V10a.75.75 0 0 1 .75-.75m11.285.75a.75.75 0 0 0-1.5 0v.701l-.607-.35a.75.75 0 0 0-.75 1.298l.607.35l-.608.351a.75.75 0 0 0 .75 1.3l.608-.351V14a.75.75 0 0 0 1.5 0v-.7l.607.35a.75.75 0 0 0 .75-1.3l-.607-.35l.607-.35a.75.75 0 0 0-.75-1.3l-.607.35z"/><path fill="currentColor" fill-rule="evenodd" d="M9.944 3.25c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433v.112c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h4.112c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.748-.749 1.08-1.698 1.238-2.87c.153-1.14.153-2.595.153-4.433v-.112c0-1.838 0-3.294-.153-4.433c-.158-1.172-.49-2.121-1.238-2.87c-.749-.748-1.698-1.08-2.87-1.238c-1.14-.153-2.595-.153-4.433-.153zM3.702 5.702c.423-.423 1.003-.677 2.009-.812c1.028-.138 2.382-.14 4.289-.14h4c1.907 0 3.262.002 4.29.14c1.005.135 1.585.389 2.008.812s.677 1.003.812 2.009c.138 1.028.14 2.382.14 4.289s-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.138-1.028-.14-2.382-.14-4.289s.002-3.261.14-4.29c.135-1.005.389-1.585.812-2.008" clip-rule="evenodd"/></svg>
      ),
      onClick: () => navigate('/change-password')
    },
    {
      id: 'faqs',
      title: 'FAQs',
      description: 'Find quick answers about bookings, payments, cancellations, and more.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11 18h2v-2h-2zm1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-14a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2a2 2 0 0 1 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5a4 4 0 0 0-4-4"/></svg>
      ),
      onClick: () => navigate('/faqs')
    },
    {
      id: 'notifications',
      title: 'Notifications & Alerts',
      description: 'Manage updates for booking confirmations, flight status, and trip reminders.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3zm5.708 12a2.5 2.5 0 0 0 4.584 0zM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6"/></svg>
      ),
      onClick: () => navigate('/notifications')
    },
    {
      id: 'support',
      title: 'Support & Help',
      description: 'Get assistance and guidance easily.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M422.401 217.174c-6.613-67.84-46.72-174.507-170.666-174.507c-123.947 0-164.054 106.667-170.667 174.507c-23.2 8.805-38.503 31.079-38.4 55.893v29.867c0 32.99 26.744 59.733 59.733 59.733c32.99 0 59.734-26.744 59.734-59.733v-29.867c-.108-24.279-14.848-46.095-37.334-55.253c4.267-39.254 25.174-132.48 126.934-132.48s122.453 93.226 126.72 132.48c-22.44 9.178-37.106 31.009-37.12 55.253v29.867a59.95 59.95 0 0 0 33.92 53.76c-8.96 16.853-31.787 39.68-87.894 46.506c-11.215-17.03-32.914-23.744-51.788-16.023c-18.873 7.72-29.646 27.717-25.71 47.725s21.48 34.432 41.872 34.432a42.67 42.67 0 0 0 37.973-23.68c91.52-10.454 120.747-57.6 129.92-85.334c24.817-8.039 41.508-31.301 41.173-57.386v-29.867c.103-24.814-15.2-47.088-38.4-55.893m-302.933 85.76c0 9.425-7.641 17.066-17.067 17.066s-17.066-7.64-17.066-17.066v-29.867a17.067 17.067 0 1 1 34.133 0zm264.533-29.867c0-9.426 7.641-17.067 17.067-17.067s17.067 7.641 17.067 17.067v29.867c0 9.425-7.641 17.066-17.067 17.066s-17.067-7.64-17.067-17.066z"/></svg>
      ),
      onClick: () => navigate('/contact')
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
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
      
      <div className="md:min-h-screen bg-white flex items-center justify-center md:px-4">
        <div className="w-full max-w-xl">
          {/* Profile Card */}
          <div className="md:px-8 px-4 mb-10">
            {/* User Profile Section */}
            <div className="text-center mb-4">
              {/* Profile Picture */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-[#364A9C] rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {/* Edit Icon */}
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>

              {/* User Name */}
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name || 'Honya Bright'}
              </h1>

              {/* User Email */}
              <p className="text-gray-600 text-sm">
                {user?.email || 'Honyabright4278@gmail.com'}
              </p>
            </div>

            {/* Menu Items */}
            <div className="space-y-1 relative z-10">
              {profileMenuItems.map((item, index) => (
                <div key={item.id}>
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center p-4 hover:bg-gray-100 transition-colors rounded-lg group"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 bg-white border border-gray-400 rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-300 transition-colors">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-800 font-medium text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="ml-4">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Divider after Change Password */}
                  {item.id === 'change-password' && (
                    <div className="border-t border-gray-300 my-2"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
