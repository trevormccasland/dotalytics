import React, { FC, ReactElement } from 'react'
import { Matches } from '../services/matchesClient'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

enum TeamNames {
  RADIANT = 'Radiant',
  DIRE = 'Dire'
}

interface PieChartItem {
  name: TeamNames
  value: number
}

interface CustomIzedLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
  name: string
}

interface RadiantDireWinChartProps {
  matches: Matches
}
const COLORS = ['#1ebd58', '#e3533d']

const RADIAN = Math.PI / 180

const renderCustomizedLabel: FC<CustomIzedLabelProps> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }): ReactElement => {
  const radius: number = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const RadiantDireWinChart: FC<RadiantDireWinChartProps> = ({ matches }): ReactElement => {
  const pieChartData: PieChartItem[] = matches.reduce((data, match) => {
    if (match.radiant_win) {
      const index = data.findIndex(item => item.name === TeamNames.RADIANT)
      data[index].value += 1
    } else {
      const index = data.findIndex(item => item.name === TeamNames.DIRE)
      data[index].value += 1
    }
    return data
  }, [{ name: TeamNames.RADIANT, value: 0 }, { name: TeamNames.DIRE, value: 0 }])
  return (
    <>
      <h2>Team Win %</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={360}
            endAngle={0}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default RadiantDireWinChart
