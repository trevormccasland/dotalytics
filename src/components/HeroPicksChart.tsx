import React, { FC, ReactElement } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Matches } from '../services/matchesClient';

type HeroPicksChartProps = {
    matches: Matches
}

const HeroPicksChart: FC<HeroPicksChartProps> = ({matches}): ReactElement => {
    const playerPicks = matches.reduce((acc, match) => {
        match.players.forEach((player) => {
          if(player.hero_name in acc) {
            acc[player.hero_name] += 1
          } else {
            acc[player.hero_name] = 1
          }
        })
        return acc
    }, {} as Record<string, number>)
    
    const playerPicksData = Object.keys(playerPicks).map(heroName => (
        {
            name: heroName.split('npc_dota_hero_')[1].replace('_', ' '),
            value: playerPicks[heroName]
        }
    ))
    return (
        <>
            <h2>Sum of Picks by Hero</h2>
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

export default HeroPicksChart