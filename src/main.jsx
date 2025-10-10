import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { GlobalProvider, SearchProvider } from './context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <SearchProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Notifications/>
          <App />
        </MantineProvider>
      </SearchProvider>
    </GlobalProvider>
  </StrictMode>,
)
