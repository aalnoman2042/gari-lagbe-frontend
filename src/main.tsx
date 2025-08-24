import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
// import { router } from './routes'
// import { ThemeProvider } from './provider/theme.provider'
// import App from './App.tsx'
import {Provider} from "react-redux"
import { store } from './redux/store'
import { router } from './routes/routes'
import { Toaster } from 'sonner'
// import { store } from './redux/store'
// import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>


    {/* <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme"> */}

  < RouterProvider router={router}/>
    <Toaster richColors/>
    {/* </ThemeProvider> */}
    </Provider>
  </StrictMode>,
)
