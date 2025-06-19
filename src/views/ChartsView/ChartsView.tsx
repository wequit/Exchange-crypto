import React from 'react'
import { ChartProvider } from '../../contexts/ChartContext/ChartProvider'
import { ChartCard } from '../../components/ChartCard/ChartCard'
import {Chart as ChartJS,LineElement,PointElement,CategoryScale,LinearScale,Tooltip,Legend,TimeScale,Filler,} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  zoomPlugin
)

const ChartsView: React.FC = () => (
  <ChartProvider>
    <ChartCard />
  </ChartProvider>
)

export default ChartsView