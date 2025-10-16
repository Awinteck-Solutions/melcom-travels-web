import { Link } from 'react-router-dom';
import { Menu, Button, Text, Avatar } from '@mantine/core';
import { useGlobalContext } from '../context';
import { IconChevronRight } from '@tabler/icons-react';

const Header = ({ currentPage }) => {
  const { isAuthenticated, user, logout } = useGlobalContext();

  return (
    <header className="bg-white px-6 py-4">
      <div className="max-w-7xll mx-auto flex items-start justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-1">
          <img className='h-20 w-20 md:h-36 md:w-36' src='/logo.svg' alt="MELCOM" />
        </div>

        {/* Navigation */}
        <nav className="md:flex hidden items-center overflow-x-auto scrollbar-thin font-semiboldl lg:space-x-8 duration-300 transition-all">
          {currentPage === 'flights' ? <a href="/flights" className="flex items-center space-x-2 text-[#364A9C]  border border-[#364A9C] bg-blue-50/50 lg:px-4 md:px-2 py-2 rounded-xl">
            <span>Flights</span>
            <svg className='hidden lg:block' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z" /></svg>
          </a>
            : <a href="/flights" className="flex items-center space-x-2 text-[#364A9C]  border border-white lg:px-4 py-2 rounded-xl">
              <span className='px-3'>Flights</span>
            </a>
          }
          {/* blogs */}
          {currentPage === 'blogs' ? <a href="/blogs" className="flex items-center space-x-2 text-[#364A9C]  border border-[#364A9C] bg-blue-50/50 lg:px-4 md:px-2 py-2 rounded-xl">
            <span>Blogs</span>
            <svg className='hidden lg:block' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 4v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8h-4" /><path d="M3 4h14v14a2 2 0 0 0 2 2v0M13 8H7m6 4H9" /></g></svg>
          </a>
            : <a href="/blogs" className="flex items-center space-x-2 text-[#364A9C]  border border-white lg:px-4 py-2 rounded-xl">
              <span className='px-3'>Blogs</span>
            </a>
          }
          {/* {currentPage === 'hotels' ? <a href="/hotels" className="flex items-center space-x-2 text-[#364A9C]  border-2 border-[#364A9C] bg-blue-50/50 px-4 py-2 rounded-xl">
            <span>Hotels</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M0 32C0 14.3 14.3 0 32 0h448c17.7 0 32 14.3 32 32s-14.3 32-32 32v384c17.7 0 32 14.3 32 32s-14.3 32-32 32H304v-48c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32m96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m-240 80c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-40 192c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8z" /></svg>
          </a>
            : <a href="/" className="text-gray-700 hover:text-[#364A9C] transition-colors">Hotels</a>
          }
          {currentPage === 'rides' ? <a href="/rides" className="flex items-center space-x-2 text-[#364A9C]  border-2 border-[#364A9C] bg-blue-50/50 px-4 py-2 rounded-xl">
            <span>Rides</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.94 9.62H23a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1.35a1.5 1.5 0 0 0-1.2.61a.09.09 0 0 1-.1 0a.12.12 0 0 1-.07-.07l-.48-2.4a3 3 0 0 0-2.94-2.41H7.14A3 3 0 0 0 4.2 4.79l-.48 2.4a.12.12 0 0 1-.07.07a.09.09 0 0 1-.1 0a1.5 1.5 0 0 0-1.2-.61H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h.06a.25.25 0 0 1 .23.16a.26.26 0 0 1 0 .27A4.42 4.42 0 0 0 0 13.12v4a1.49 1.49 0 0 0 .86 1.35a.27.27 0 0 1 .14.23v1.42a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-1.24a.26.26 0 0 1 .25-.26h11.5a.26.26 0 0 1 .25.26v1.24a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5V18.7a.27.27 0 0 1 .14-.23a1.49 1.49 0 0 0 .86-1.35v-4a4.42 4.42 0 0 0-1.25-3.07a.26.26 0 0 1 0-.27a.25.25 0 0 1 .19-.16m-19.69 8H1.5a.5.5 0 0 1-.5-.5v-.5a.5.5 0 0 1 .5-.5h1.75a.76.76 0 0 1 .75.76a.75.75 0 0 1-.75.74m2.12-4.09a.23.23 0 0 1-.19.09H4a2 2 0 0 1-2-1.71a.25.25 0 0 1 .06-.2a.28.28 0 0 1 .19-.09H4.5a.68.68 0 0 1 .62.49l.3 1.2a.25.25 0 0 1-.05.22M16 13.28l-.54 1.64a2.49 2.49 0 0 1-2.37 1.7h-2.15a2.49 2.49 0 0 1-2.37-1.7L8 13.28a.48.48 0 0 1 .06-.45a.52.52 0 0 1 .41-.21h7a.52.52 0 0 1 .41.21a.48.48 0 0 1 .12.45m2.45-4.75a.25.25 0 0 1-.19.09H5.77a.25.25 0 0 1-.19-.09a.21.21 0 0 1 0-.2l.63-3.15a1 1 0 0 1 1-.8h9.72a1 1 0 0 1 1 .8l.63 3.15a.21.21 0 0 1-.14.2Zm.4 5.09a.23.23 0 0 1-.19-.09a.25.25 0 0 1-.05-.22l.3-1.2a.68.68 0 0 1 .62-.49h2.23a.28.28 0 0 1 .19.09a.25.25 0 0 1 .06.2a2 2 0 0 1-2 1.71Zm4.18 3v.5a.5.5 0 0 1-.5.5h-1.78a.75.75 0 0 1-.75-.74a.76.76 0 0 1 .75-.76h1.75a.5.5 0 0 1 .5.5Z" /></svg>
          </a>
            : <a href="/" className="text-gray-700 hover:text-[#364A9C] transition-colors">Rides</a>
          } */}
          {currentPage === 'contact' ? <a href="/" className="flex items-center space-x-2 text-[#364A9C]  border border-[#364A9C] bg-blue-50/50 lg:px-4 md:px-2 py-2 rounded-xl">
            <span>Contact us</span>
            <svg className='hidden lg:block' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100"><path fill="currentColor" d="M84.96 70.237c-.167-1.032-.814-1.914-1.783-2.438l-14.335-8.446l-.118-.066a4.26 4.26 0 0 0-1.937-.45c-1.201 0-2.348.455-3.144 1.253l-4.231 4.233c-.181.172-.771.421-.95.43c-.049-.004-4.923-.355-13.896-9.329c-8.957-8.955-9.337-13.844-9.34-13.844c.005-.25.251-.838.426-1.02l3.608-3.607c1.271-1.274 1.652-3.386.898-5.022L32.19 16.938c-.579-1.192-1.704-1.928-2.952-1.928c-.883 0-1.735.366-2.401 1.031l-9.835 9.813c-.943.938-1.755 2.578-1.932 3.898c-.086.631-1.831 15.693 18.819 36.346C51.42 83.627 65.09 84.989 68.865 84.989a11 11 0 0 0 1.376-.071c1.316-.176 2.954-.986 3.891-1.925l9.827-9.826c.802-.806 1.168-1.871 1.001-2.93" /></svg>
          </a>
            : <a href="/contact" className="flex items-center space-x-2 text-[#364A9C]  border border-white lg:px-4 py-2 rounded-xl">
              <span className='px-3'>Contact us</span>
            </a>
          }
        </nav>

        <div className="md:hidden px-2 hover:bg-gray-200 duration-200 text-[#364A9C] m-2 h-[20px]l rounded">
          <Menu offset={13} transitionProps={{ transition: 'rotate-right', duration: 150 }}
            width={250} shadow="md">
            <Menu.Target>
              <p className="flex items-center h-full" ><span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
              </span></p>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item style={{ borderTop: '1px solid lightgray', borderRadius: '0px' }} p={0} my={2}>
                <Link to={'/flights'} className={currentPage == 'flights' ? "bg-gray-200 flex items-center gap-1 text-base text-[#364A9C] rounded p-3 px-3" : " flex text-[#364A9C] items-center gap-3 text-base  p-3 px-3 rounded cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z" /></svg>
                  <span> Flights </span>
                </Link>
              </Menu.Item>
              <Menu.Item style={{ borderTop: '1px solid lightgray', borderRadius: '0px' }} p={0} my={2}>
                <Link to={'/blogs'} className={currentPage == 'blogs' ? "bg-gray-200 flex items-center gap-1 text-base text-[#364A9C] rounded p-3 px-3" : " flex text-[#364A9C] items-center gap-3 text-base  p-3 px-3 rounded cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z" /></svg>
                  <span> Blogs </span>
                </Link>
              </Menu.Item>

              {/* <Menu.Item style={{ borderTop: '1px solid lightgray', borderRadius: '0px' }} p={0} my={2}>
                <Link to={'/'} className={currentPage == 'hotels' ? "bg-gray-200 flex items-center gap-1 text-base text-[#364A9C] rounded p-3 px-3" : " flex text-[#364A9C] items-center gap-3 text-base  p-3 px-3 rounded cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M0 32C0 14.3 14.3 0 32 0h448c17.7 0 32 14.3 32 32s-14.3 32-32 32v384c17.7 0 32 14.3 32 32s-14.3 32-32 32H304v-48c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32m96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m-240 80c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-40 192c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8z" /></svg>
                  <span> Hotels </span>
                </Link>
              </Menu.Item> */}

              {/* <Menu.Item style={{ borderTop: '1px solid lightgray', borderRadius: '0px' }} p={0} my={2}>
                <Link to={'/'} className={currentPage == 'rides' ? "bg-gray-200 flex items-center gap-1 text-base text-[#364A9C] rounded p-3 px-3" : " flex text-[#364A9C] items-center gap-3 text-base  p-3 px-3 rounded cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.94 9.62H23a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1.35a1.5 1.5 0 0 0-1.2.61a.09.09 0 0 1-.1 0a.12.12 0 0 1-.07-.07l-.48-2.4a3 3 0 0 0-2.94-2.41H7.14A3 3 0 0 0 4.2 4.79l-.48 2.4a.12.12 0 0 1-.07.07a.09.09 0 0 1-.1 0a1.5 1.5 0 0 0-1.2-.61H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h.06a.25.25 0 0 1 .23.16a.26.26 0 0 1 0 .27A4.42 4.42 0 0 0 0 13.12v4a1.49 1.49 0 0 0 .86 1.35a.27.27 0 0 1 .14.23v1.42a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-1.24a.26.26 0 0 1 .25-.26h11.5a.26.26 0 0 1 .25.26v1.24a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5V18.7a.27.27 0 0 1 .14-.23a1.49 1.49 0 0 0 .86-1.35v-4a4.42 4.42 0 0 0-1.25-3.07a.26.26 0 0 1 0-.27a.25.25 0 0 1 .19-.16m-19.69 8H1.5a.5.5 0 0 1-.5-.5v-.5a.5.5 0 0 1 .5-.5h1.75a.76.76 0 0 1 .75.76a.75.75 0 0 1-.75.74m2.12-4.09a.23.23 0 0 1-.19.09H4a2 2 0 0 1-2-1.71a.25.25 0 0 1 .06-.2a.28.28 0 0 1 .19-.09H4.5a.68.68 0 0 1 .62.49l.3 1.2a.25.25 0 0 1-.05.22M16 13.28l-.54 1.64a2.49 2.49 0 0 1-2.37 1.7h-2.15a2.49 2.49 0 0 1-2.37-1.7L8 13.28a.48.48 0 0 1 .06-.45a.52.52 0 0 1 .41-.21h7a.52.52 0 0 1 .41.21a.48.48 0 0 1 .12.45m2.45-4.75a.25.25 0 0 1-.19.09H5.77a.25.25 0 0 1-.19-.09a.21.21 0 0 1 0-.2l.63-3.15a1 1 0 0 1 1-.8h9.72a1 1 0 0 1 1 .8l.63 3.15a.21.21 0 0 1-.14.2Zm.4 5.09a.23.23 0 0 1-.19-.09a.25.25 0 0 1-.05-.22l.3-1.2a.68.68 0 0 1 .62-.49h2.23a.28.28 0 0 1 .19.09a.25.25 0 0 1 .06.2a2 2 0 0 1-2 1.71Zm4.18 3v.5a.5.5 0 0 1-.5.5h-1.78a.75.75 0 0 1-.75-.74a.76.76 0 0 1 .75-.76h1.75a.5.5 0 0 1 .5.5Z" /></svg>
                  <span> Rides </span>
                </Link>
              </Menu.Item> */}

              {isAuthenticated ? (
                <div>
                  <Menu.Item style={{ borderTop: '1px solid lightgray', borderRadius: '0px' }} p={0} my={2}>
                    <div className={`flex items-center space-x-3 ${currentPage == 'profile' ? 'bg-gray-200 flex items-center gap-1 text-base text-[#364A9C] rounded p-3 px-3':''}`}>
                      <Link to="/profile" className="flex items-center space-x-2  text-gray-700 hover:text-[#364A9C] transition-colors">
                        {user?.image ? (
                          <Avatar src={`${user.image}`} radius="xl" />
                        ) : (
                          <div className="w-8 h-8 bg-[#364A9C] rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                        <div className='flex items-center'>
                          <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                              {`${user?.firstname} ${user?.lastname}`}
                            </Text>

                            <Text c="dimmed" size="xs">
                              {user?.email}
                            </Text>
                          </div>
                          <IconChevronRight size={16} />
                        </div>
                        {/*  */}
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item style={{ borderTop: '1px solid lightgray', borderRadius: '0px' }} p={0} my={2}>
                    <button
                      onClick={logout}
                      className=" flex text-[#364A9C] items-center gap-3 text-base  p-3 px-3 rounded cursor-pointer"
                    >

                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712l-.015-.105c-.115-.844-.115-1.916-.115-3.247v-.053c0-.403.331-.73.74-.73c.408 0 .739.327.739.73c0 1.396.001 2.37.101 3.105c.098.714.275 1.093.548 1.362s.656.445 1.379.54c.744.1 1.731.101 3.146.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.402.002-3.146.1c-.723.096-1.106.272-1.379.541c-.273.27-.45.648-.548 1.362c-.1.734-.101 1.708-.101 3.105c0 .403-.331.73-.74.73a.734.734 0 0 1-.739-.73v-.053c0-1.33 0-2.403.115-3.247l.015-.105c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m9.885 5.38l2.464-2.432a.723.723 0 0 0 0-1.032l-2.464-2.432a.746.746 0 0 0-1.045 0a.723.723 0 0 0 0 1.032l1.202 1.186H6.457a.734.734 0 0 0-.74.73c0 .403.331.73.74.73h7.085l-1.202 1.186a.723.723 0 0 0 0 1.032a.746.746 0 0 0 1.045 0" clipRule="evenodd" /></svg>
                      <span> Logout </span>
                    </button>
                  </Menu.Item>

                </div>


              ) : (
                <>
                  <Menu.Item style={{ borderTop: '1px solid lightgray', borderRadius: '0px' }} p={0} my={2}>
                    <Link to={'/login'} className={currentPage == 'login' ? "bg-gray-200 flex items-center gap-1 text-base text-[#364A9C] rounded p-3 px-3" : " flex text-[#364A9C] items-center gap-3 text-base  p-3 px-3 rounded cursor-pointer"}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712l-.015-.105c-.115-.844-.115-1.916-.115-3.247v-.053c0-.403.331-.73.74-.73c.408 0 .739.327.739.73c0 1.396.001 2.37.101 3.105c.098.714.275 1.093.548 1.362s.656.445 1.379.54c.744.1 1.731.101 3.146.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.402.002-3.146.1c-.723.096-1.106.272-1.379.541c-.273.27-.45.648-.548 1.362c-.1.734-.101 1.708-.101 3.105c0 .403-.331.73-.74.73a.734.734 0 0 1-.739-.73v-.053c0-1.33 0-2.403.115-3.247l.015-.105c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m9.885 5.38l2.464-2.432a.723.723 0 0 0 0-1.032l-2.464-2.432a.746.746 0 0 0-1.045 0a.723.723 0 0 0 0 1.032l1.202 1.186H6.457a.734.734 0 0 0-.74.73c0 .403.331.73.74.73h7.085l-1.202 1.186a.723.723 0 0 0 0 1.032a.746.746 0 0 0 1.045 0" clipRule="evenodd" /></svg>
                      <span> Login </span>
                    </Link>

                  </Menu.Item>
                </>
              )}


            </Menu.Dropdown>
          </Menu>
        </div>

        {/* Authentication Buttons */}
        <div className="md:flex hidden items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-[#364A9C] transition-colors">
                {user?.image ? (
                  <Avatar src={`${user.image}`} radius="xl" />
                ) : (
                  <div className="w-8 h-8 bg-[#364A9C] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className='flex items-center'>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {`${user?.firstname} ${user?.lastname}`}
                    </Text>

                    <Text c="dimmed" size="xs">
                      {user?.email}
                    </Text>
                  </div>
                  <IconChevronRight size={16} />
                </div>
                {/*  */}
              </Link>
              {/* <button
                onClick={logout}
                className="px-4 py-2 border border-[#364A9C] text-[#364A9C] rounded-lg hover:bg-blue-50 transition-colors"
              >
                Logout
              </button> */}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 border-2 border-[#364A9C] font-semibold text-[#364A9C] rounded-full min-w-24 text-center hover:bg-blue-50 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-[#364A9C] font-semibold text-white rounded-full min-w-24 text-center hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
