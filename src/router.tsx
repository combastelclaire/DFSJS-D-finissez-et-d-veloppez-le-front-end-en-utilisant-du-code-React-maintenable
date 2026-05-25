import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import CountryDetailPage from './pages/CountryDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/country/:id',
    element: <CountryDetailPage />,
  },
])

export default router
