import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
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

const CountryDetailPage: FC = () => {
  const { id } = useParams()

  const country = olympicsData.find((o) => o.id === Number(id))

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
