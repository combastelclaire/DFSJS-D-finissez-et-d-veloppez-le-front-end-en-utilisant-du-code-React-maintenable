import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import HeaderComponent from '../components/HeaderComponent'
import useData from '../hooks/useData'

const CountryDetailPage: FC = () => {
  const { id } = useParams()
  const { data, loading } = useData()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const country = data.find((o) => o.id === Number(id))

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Pays introuvable.</p>
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
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <HeaderComponent title={country.country} indicators={indicators} />
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: '400px' }}>
            <Line data={evolutionData} options={evolutionOptions} />
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-4">
          <p>Données des 5 dernières éditions des Jeux Olympiques</p>
        </div>
      </div>
    </div>
  )
}

export default CountryDetailPage
