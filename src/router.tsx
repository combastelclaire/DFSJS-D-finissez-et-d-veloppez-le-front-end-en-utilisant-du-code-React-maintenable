import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import CountryDetailPage from './pages/CountryDetailPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/country/:id',
    element: <CountryDetailPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
