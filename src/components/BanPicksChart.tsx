import React, { FC, ReactElement } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Matches } from '../services/matchesClient'

interface BanPicksChartProps {
  matches: Matches
}

const BanPicksChart: FC<BanPicksChartProps> = ({ matches }): ReactElement => {
  const banPicks = matches.reduce<Record<string, number>>((acc, match) => {
    match.picks_bans.forEach((ban) => {
      if (ban.hero_name in acc) {
        acc[ban.hero_name] += 1
      } else {
        acc[ban.hero_name] = 1
      }
    })
    return acc
  }, {})

  const playerPicksData = Object.keys(banPicks).map(heroName => (
    {
      name: heroName.split('npc_dota_hero_')[1].replace('_', ' '),
      value: banPicks[heroName]
    }
  ))
  return (
        <>
            <h2>Sum of Bans by Hero</h2>
            <ResponsiveContainer width='100%' height={400}>
                <BarChart data={playerPicksData} >
                    <Tooltip />
                    <Legend />
                    <YAxis />
                    <XAxis dataKey="name" />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
  )
}

export default BanPicksChart
