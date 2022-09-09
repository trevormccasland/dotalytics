import React, { FC, ReactElement } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Matches } from '../services/matchesClient'

interface KillsChartProps {
  matches: Matches
}

const KillsChart: FC<KillsChartProps> = ({ matches }): ReactElement => {
  const matchKills = matches.map(match => (
    {
      name: match.match_id,
      kills: match.players.reduce((acc, player) => acc + player.kills, 0)
    }
  ))
  return (
        <>
            <h2>Kills by Match ID</h2>
            <ResponsiveContainer width='100%' height={400}>
                <BarChart data={matchKills}>
                    <Tooltip />
                    <Legend />
                    <YAxis />
                    <XAxis dataKey="name" />
                    <Bar dataKey="kills" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
  )
}

export default KillsChart
