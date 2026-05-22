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
    <div className="mb-8">
      <div className="flex justify-center mb-6">
        <h1 className="bg-teal-800 text-white text-xl md:text-2xl xl:text-3xl font-bold px-8 py-3 rounded-xl text-center">
          {title}
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {indicators.map((indicator) => (
          <div
            key={indicator.label}
            className="flex-1 border border-teal-700 bg-gray-800 rounded-xl p-6 text-center"
          >
            <h3 className="text-gray-400 text-sm font-semibold md:text-base mb-2">{indicator.label}</h3>
            <p className={`text-3xl md:text-4xl font-bold ${indicator.color}`}>
              {indicator.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeaderComponent
