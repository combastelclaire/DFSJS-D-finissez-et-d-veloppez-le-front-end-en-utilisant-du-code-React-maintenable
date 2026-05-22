import { useState, useEffect } from 'react'
import type { Olympic } from '../models/Olympic'
import olympicsData from '../data/olympics.json'

const useData = () => {
  const [data, setData] = useState<Olympic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(olympicsData as Olympic[])
    setLoading(false)
  }, [])

  return { data, loading }
}

export default useData
