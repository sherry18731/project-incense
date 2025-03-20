// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router';
import store from './redux/store.js';
import { Provider } from 'react-redux'

import routes from './routes/index.jsx';
const router = createHashRouter(routes)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)