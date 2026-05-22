import type { FC } from 'react'
import { Pie } from 'react-chartjs-2'
import type { Olympic } from '../models/Olympic'
import HeaderComponent from '../components/HeaderComponent'

const olympicsData: Olympic[] = [
  {
    id: 1,
    country: 'États-Unis',
    participations: [
      { id: 1, year: 2020, city: 'Tokyo', medalsCount: 113, athleteCount: 613 },
      { id: 2, year: 2016, city: 'Rio', medalsCount: 121, athleteCount: 555 },
      { id: 3, year: 2012, city: 'Londres', medalsCount: 104, athleteCount: 530 },
      { id: 4, year: 2008, city: 'Pékin', medalsCount: 112, athleteCount: 596 },
      { id: 5, year: 2004, city: 'Athènes', medalsCount: 101, athleteCount: 533 }
    ],
  },
  {
    id: 2,
    country: 'Chine',
    participations: [
      { id: 6, year: 2020, city: 'Tokyo', medalsCount: 88, athleteCount: 431 },
      { id: 7, year: 2016, city: 'Rio', medalsCount: 70, athleteCount: 413 },
      { id: 8, year: 2012, city: 'Londres', medalsCount: 88, athleteCount: 396 },
      { id: 9, year: 2008, city: 'Pékin', medalsCount: 100, athleteCount: 639 },
      { id: 10, year: 2004, city: 'Athènes', medalsCount: 63, athleteCount: 407 }
    ],
  },
  {
    id: 3,
    country: 'Japon',
    participations: [
      { id: 11, year: 2020, city: 'Tokyo', medalsCount: 58, athleteCount: 582 },
      { id: 12, year: 2016, city: 'Rio', medalsCount: 41, athleteCount: 338 },
      { id: 13, year: 2012, city: 'Londres', medalsCount: 38, athleteCount: 293 },
      { id: 14, year: 2008, city: 'Pékin', medalsCount: 25, athleteCount: 351 },
      { id: 15, year: 2004, city: 'Athènes', medalsCount: 37, athleteCount: 312 }
    ],
  },
  {
    id: 4,
    country: 'Grande-Bretagne',
    participations: [
      { id: 16, year: 2020, city: 'Tokyo', medalsCount: 65, athleteCount: 376 },
      { id: 17, year: 2016, city: 'Rio', medalsCount: 67, athleteCount: 366 },
      { id: 18, year: 2012, city: 'Londres', medalsCount: 65, athleteCount: 541 },
      { id: 19, year: 2008, city: 'Pékin', medalsCount: 51, athleteCount: 312 },
      { id: 20, year: 2004, city: 'Athènes', medalsCount: 30, athleteCount: 264 }
    ],
  },
  {
    id: 5,
    country: 'France',
    participations: [
      { id: 21, year: 2020, city: 'Tokyo', medalsCount: 33, athleteCount: 378 },
      { id: 22, year: 2016, city: 'Rio', medalsCount: 42, athleteCount: 401 },
      { id: 23, year: 2012, city: 'Londres', medalsCount: 34, athleteCount: 330 },
      { id: 24, year: 2008, city: 'Pékin', medalsCount: 41, athleteCount: 323 },
      { id: 25, year: 2004, city: 'Athènes', medalsCount: 33, athleteCount: 308 }
    ],
  },
]

const DashboardPage: FC = () => {
  const indicators = [
    { label: 'Pays participants', value: olympicsData.length, color: 'text-blue-400' },
    { label: 'Éditions des JO', value: 5, color: 'text-green-400' }
  ]

  const chartData = {
    labels: olympicsData.map((o) => o.country),
    datasets: [
      {
        label: 'Total des médailles',
        data: olympicsData.map((o) =>
          o.participations.reduce((sum, p) => sum + p.medalsCount, 0)
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <HeaderComponent
          title="Historique des Jeux Olympiques - TéléSport"
          indicators={indicators}
        />
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: '400px' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="text-sm text-gray-400">
          <p>Cliquez sur un pays pour voir ses détails</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
