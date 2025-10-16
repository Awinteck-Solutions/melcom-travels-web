import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { notifications } from '@mantine/notifications';
import { getAllFAQs } from '../services/auth.service';
import { Loader } from '@mantine/core';
const FAQsPage = () => {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(0); // First item expanded by default
  const [faqs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchFAQs = async () => {
      setIsLoading(true);
      const response = await getAllFAQs();
      console.log('response', response.data.data);
      if (response.status) {
        setFAQs(response.data.data);
      }
      setIsLoading(false);
    };
    fetchFAQs();
  }, []);

  

  const toggleExpanded = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

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
          <div className="w-full max-w-4xl">
            {/* FAQs Content */}
            <div className="md:px-8 px-4 mb-10 relative z-10">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">FAQs</h1>
                <p className="text-xl text-gray-600">Frequently Asked Questions (FAQs)</p>
              </div>

              {/* FAQ Items */}
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader color="blue" size="sm" />
                </div>
              ) : (
                  <div className="space-y-4">
                {faqs?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      {/* Question */}
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">
                        {item.question}
                      </h3>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 border-2 border-[#364A9C] rounded-full flex items-center justify-center transition-transform duration-200 ${
                          expandedItem === item.id ? 'rotate-180' : ''
                        }`}>
                          <svg 
                            className="w-4 h-4 text-[#364A9C]" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 9l-7 7-7-7" 
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Answer */}
                    {expandedItem === item.id && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              )}

              {/* Contact Support */}
              <div className="mt-12 text-center">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-[#364A9C] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FAQsPage;
