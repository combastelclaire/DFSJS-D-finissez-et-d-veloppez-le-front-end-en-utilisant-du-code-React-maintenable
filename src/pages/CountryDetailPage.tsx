import type { FC } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import HeaderComponent from '../components/HeaderComponent'
import useData from '../hooks/useData'

const CountryDetailPage: FC = () => {
  const { id } = useParams()
  const { data, loading } = useData()
  const navigate = useNavigate()
  const location = useLocation()
  const { border, background } = location.state as { border: string; background: string }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center" role="status" aria-label="Chargement en cours">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const country = data.find((o) => o.id === Number(id))

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Pays introuvable.</p>
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

  const totalMedals = country.participations.reduce((sum, p) => sum + p.medalsCount, 0)
  const totalAthletes = country.participations.reduce((sum, p) => sum + p.athleteCount, 0)

  const indicators = [
    { label: 'Participations', value: country.participations.length, color: 'text-blue-400' },
    { label: 'Total médailles', value: totalMedals, color: 'text-yellow-400' },
    { label: 'Total athlètes', value: totalAthletes, color: 'text-green-400' },
  ]

  const evolutionData = {
    labels: country.participations.map((p) => p.year.toString()),
    datasets: [
      {
        label: 'Nombre de médailles',
        data: country.participations.map((p) => p.medalsCount),
        borderColor: border,
        backgroundColor: background,
        tension: 0.3,
      },
    ],
  }

  const evolutionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'white' },
      },
    },
    scales: {
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4">
        <div className="col-span-4 md:col-span-8 xl:col-span-12">
          <button
            onClick={() => navigate('/')}
            className="mb-4 bg-teal-700 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg"
            aria-label="Retour au dashboard"
          >
            ← Retour
          </button>
          <HeaderComponent title={country.country} indicators={indicators} />
        </div>
        <div className="col-span-4 md:col-span-8 xl:col-span-12 bg-gray-800 p-4 md:p-8 rounded-lg shadow-xl">
          <figure aria-label={`Graphique d'évolution des médailles pour ${country.country}`}>
            <div className="h-64 md:h-80 xl:h-100">
              <Line data={evolutionData} options={evolutionOptions} />
            </div>
            <figcaption className="text-sm text-gray-400 mt-4 text-center">
              Évolution du nombre de médailles de {country.country} sur les 5 dernières éditions des Jeux Olympiques.
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

export default CountryDetailPage
