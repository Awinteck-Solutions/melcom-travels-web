import React, { useState } from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Container from '../../../../components/Container';
import { useGlobalContext } from '../../../../context';

const ContactPage = () => {
  const { isAuthenticated, user } = useGlobalContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call here
  };

  return (
    <Container>
      {/* Header */}
      <Header currentPage="contact" />
      <div className='relative'>
        <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
          <img src="/contact-dots.svg" alt="stars" className="md:w-1/2 w-4/5 m-auto object-cover" />
        </div>
      </div>

      <div className=''>
        <div className='px-6'>
          {/* Hero Section */}
          <div className="relative pb-20 rounded-2xl">
           <div className="relative max-w-7xl mx-auto px-6 text-center">
              <h1 className=" text-gray-400 mb-1 tracking-wider">
                CONTACT US
              </h1>
              <h2 className="md:text-3xl font-bold text-gray-800 leading-tight">
                We're Here to Help You Travel Better
              </h2>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left Column - Contact Options */}
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gray-800 mb-8">Contact Options</h3>
                
                {/* Live Chat */}
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#364A9C] rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#364A9C] transition-colors">Live Chat</h4>
                    <p className="text-gray-600">Chat instantly with our travel support team right from the site.</p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group">
                  <div className="flex-shrink-0 text-white w-12 h-12 bg-[#364A9C] rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.5H9c-1.1 0-2 .9-2 2v9a2 2 0 0 0 2 2h13c1.11 0 2-.89 2-2v-9a2 2 0 0 0-2-2m0 3.67l-6.5 3.33L9 9.17V7.5l6.5 3.31L22 7.5zM5 16.5c0 .17.03.33.05.5H1c-.552 0-1-.45-1-1s.448-1 1-1h4zM3 7h2.05c-.02.17-.05.33-.05.5V9H3c-.55 0-1-.45-1-1s.45-1 1-1m-2 5c0-.55.45-1 1-1h3v2H2c-.55 0-1-.45-1-1"/></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#364A9C] transition-colors">Email Support</h4>
                    <p className="text-gray-600">
                      Email us at <span className="text-[#364A9C] font-bold">support@melcomtravelandtour.com</span>
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#364A9C] rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#364A9C] transition-colors">Call Us</h4>
                    <p className="text-gray-600">
                      <span className="text-[#364A9C] font-bold">+233 123 456 789</span> (Available 8 AM - 10 PM GMT)
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 cursor-pointer group">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">Chat With Us on WhatsApp</h4>
                    <p className="text-gray-600">
                      Need help? WhatsApp us at <span className="text-[#364A9C] font-bold">+233 123 456 789</span> quick replies!
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Support Form */}
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-8">Support Form</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                      required
                    >
                      <option value="">Select inquiry type</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Support</option>
                      <option value="cancellation">Cancellation</option>
                      <option value="refund">Refund Request</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#364A9C] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
};

export default ContactPage;
