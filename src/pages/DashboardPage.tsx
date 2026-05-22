import type { FC } from 'react'
import { Pie } from 'react-chartjs-2'
import HeaderComponent from '../components/HeaderComponent'
import useData from '../hooks/useData'

const DashboardPage: FC = () => {
  const { data, loading } = useData()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center" role="status" aria-label="Chargement en cours">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const indicators = [
    { label: 'Pays participants', value: data.length, color: 'text-blue-400' },
    { label: 'Éditions des JO', value: 5, color: 'text-green-400' },
  ]

  const chartData = {
    labels: data.map((o) => o.country),
    datasets: [
      {
        label: 'Total des médailles',
        data: data.map((o) =>
          o.participations.reduce((sum, p) => sum + p.medalsCount, 0)
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4">
        <div className="col-span-4 md:col-span-8 xl:col-span-12">
          <HeaderComponent
            title="Historique des Jeux Olympiques - TéléSport"
            indicators={indicators}
          />
        </div>
        <div className="col-span-4 md:col-span-8 xl:col-span-12 bg-gray-800 p-4 md:p-8 rounded-lg shadow-xl">
          <figure aria-label="Graphique en camembert : total des médailles olympiques par pays">
            <div className="h-64 md:h-80 xl:h-100">
              <Pie data={chartData} options={chartOptions} />
            </div>
            <figcaption className="text-sm text-gray-400 mt-4 text-center">
              Total des médailles olympiques par pays (Etats-Unis, Chine, Japon, Grande-Bretagne, France) sur les 5 dernières éditions. Cliquez sur un pays pour voir ses détails.
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
