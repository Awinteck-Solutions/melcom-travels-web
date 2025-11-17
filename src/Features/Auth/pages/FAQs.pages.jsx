import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import { notifications } from '@mantine/notifications';
import { getAllFAQs } from '../services/auth.service';
import { Loader, Accordion } from '@mantine/core';
import { ScrollAnimation } from '../../../components/animations';

const FAQsPage = () => {
  const navigate = useNavigate();
  const [faqs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFAQs = async () => {
      setIsLoading(true);
      try {
        const response = await getAllFAQs();
        if (response.status) {
          // Filter only ACTIVE FAQs and sort by order
          const activeFAQs = (response.data.data || [])
            .filter(faq => faq.status === 'ACTIVE')
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          setFAQs(activeFAQs);
        } else {
          notifications.show({
            title: 'Error',
            message: response.message || 'Failed to load FAQs',
            color: 'red',
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        notifications.show({
          title: 'Error',
          message: 'An unexpected error occurred while loading FAQs',
          color: 'red',
          position: 'top-right',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchFAQs();
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
            {/* FAQs Content */}
            <div className="md:px-8 px-4 mb-10 relative z-10">
              {/* Header Section */}
              <ScrollAnimation animation="fadeUp">
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">FAQs</h1>
                  <p className="text-xl text-gray-600">Frequently Asked Questions (FAQs)</p>
                </div>
              </ScrollAnimation>

              {/* FAQ Items */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader color="#364A9C" size="lg" />
                </div>
              ) : faqs.length > 0 ? (
                <ScrollAnimation animation="fadeUp">
                  <Accordion
                    variant="separated"
                    radius="md"
                    defaultValue={faqs.length > 0 ? faqs[0]._id : null}
                    styles={{
                      item: {
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        '&[data-active]': {
                          borderColor: '#364A9C',
                        },
                      },
                      control: {
                        padding: '1.5rem',
                        '&:hover': {
                          backgroundColor: '#f9fafb',
                        },
                      },
                      label: {
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#1f2937',
                      },
                      content: {
                        padding: '0 1.5rem 1.5rem 1.5rem',
                      },
                      chevron: {
                        color: '#364A9C',
                        '&[data-rotate]': {
                          transform: 'rotate(180deg)',
                        },
                      },
                    }}
                  >
                    {faqs.map((item) => (
                      <Accordion.Item key={item._id} value={item._id}>
                        <Accordion.Control>
                          <div className="flex items-center justify-between w-full pr-4">
                            <h3 className="text-lg font-semibold text-gray-800 text-left">
                              {item.question}
                            </h3>
                            {item.category && (
                              <span className="ml-4 px-3 py-1 text-xs font-medium text-[#364A9C] bg-blue-50 rounded-full">
                                {item.category}
                              </span>
                            )}
                          </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <div className="pt-4">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </ScrollAnimation>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Found</h3>
                  <p className="text-gray-500">Unable to load FAQs at this time.</p>
                </div>
              )}

              {/* Contact Support */}
              {!isLoading && faqs.length > 0 && (
                <ScrollAnimation animation="fadeUp">
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
                </ScrollAnimation>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FAQsPage;
