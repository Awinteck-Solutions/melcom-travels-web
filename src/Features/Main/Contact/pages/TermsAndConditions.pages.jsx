import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/Container';
import Header from '../../../../components/Header';
import { notifications } from '@mantine/notifications';
import { getTermsAndConditions } from '../services/Contact.services';
import { Loader } from '@mantine/core';
import { ScrollAnimation } from '../../../../components/animations';

const TermsAndConditionsPage = () => {
  const navigate = useNavigate();
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      setIsLoading(true);
      try {
        const response = await getTermsAndConditions();
        if (response.status) {
          setTermsData(response.data.data);
        } else {
          notifications.show({
            title: 'Error',
            message: response.message || 'Failed to load terms and conditions',
            color: 'red',
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error fetching terms and conditions:', error);
        notifications.show({
          title: 'Error',
          message: 'An unexpected error occurred while loading terms and conditions',
          color: 'red',
          position: 'top-right',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTermsAndConditions();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {/* Header */}
      <Header currentPage="flights" />
      <div className='relative'>
        <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
          <img src="/contact-dots.svg" alt="stars" className="md:w-1/5 w-4/5 m-auto object-cover" />
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
            {/* Terms and Conditions Content */}
            <div className="md:px-8 px-4 mb-10 relative z-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader color="#364A9C" size="lg" />
                </div>
              ) : termsData ? (
                <>
                  {/* Header Section */}
                  <ScrollAnimation animation="fadeUp">
                    <div className="text-center mb-12">
                      <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {termsData.title || 'Terms and Conditions'}
                      </h1>
                    </div>
                  </ScrollAnimation>

                  {/* Content Section */}
                  <ScrollAnimation animation="fadeUp">
                    <div className="bg-white rounded-lg">
                      <div 
                        className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-semibold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#364A9C] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-h3:text-2xl prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3"
                        dangerouslySetInnerHTML={{ __html: termsData.content || '' }}
                        style={{
                          lineHeight: '1.8',
                        }}
                      />
                    </div>
                  </ScrollAnimation>

                  {/* Contact Support Section */}
                  <ScrollAnimation animation="fadeUp">
                    <div className="mt-12 text-center">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Questions about our Terms and Conditions?
                        </h3>
                        <p className="text-gray-600 mb-4">
                          If you have any questions or concerns about our terms and conditions, please don't hesitate to contact us.
                        </p>
                        <button
                          onClick={() => navigate('/contact')}
                          className="bg-[#364A9C] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Terms and Conditions Found</h3>
                  <p className="text-gray-500">Unable to load terms and conditions at this time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TermsAndConditionsPage;

