import type { FC } from 'react'

interface Indicator {
  label: string,
  value: number,
  color: string
}

interface HeaderComponentProps {
  title: string,
  indicators: Indicator[]
}

const HeaderComponent: FC<HeaderComponentProps> = ({ title, indicators }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="mb-2">
        {indicators.map((indicator, index) => (
          <div
            key={indicator.label}
            className={`bg-gray-800 p-6 rounded-lg shadow-lg text-center ${index < indicators.length - 1 ? 'mb-2' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-2">{indicator.label}</h3>
            <p className={`text-4xl font-bold ${indicator.color}`}>
              {indicator.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeaderComponent
