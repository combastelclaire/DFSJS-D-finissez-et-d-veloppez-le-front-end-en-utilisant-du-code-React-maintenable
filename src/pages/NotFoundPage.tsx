import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-teal-600">404</h1>
      <p className="text-xl text-gray-300">Page introuvable.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-teal-700 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg"
        aria-label="Retour au dashboard"
      >
        ← Retour
      </button>
    </div>
  )
}

export default NotFoundPage
