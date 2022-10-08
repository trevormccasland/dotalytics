import React, { FC, ReactElement } from 'react'
import { Match } from '../services/matchesClient'

import './HeroWinRateTable.css'

interface HeroWinRateTableProps {
  matches: Match[]
}

const HeroWinRateTable: FC<HeroWinRateTableProps> = ({ matches }): ReactElement => {
  const winByHero = matches.reduce<Record<string, number>>((map, match) => {
    match.players.forEach(player => {
      if ((player.team_number === 1 && !match.radiant_win) || (player.team_number === 0 && match.radiant_win)) {
        if (player.hero_name in map) {
          map[player.hero_name] += 1
        } else {
          map[player.hero_name] = 1
        }
      }
    })
    return map
  }, {})
  return (
    <table className='heroWinRateTable'>
      <thead className='tableHeader'>
        <tr>
          <th>
            Photo
          </th>
          <th>
            Hero Name
          </th>
          <th>
            # Hero Wins
          </th>
          <th>
            Hero Win %
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(winByHero).sort((hero1, hero2) => winByHero[hero2] - winByHero[hero1]).map((hero, i) => {
          return (
            <tr key={i}>
              <td>
                <img src={`http://cdn.dota2.com/apps/dota2/images/heroes/${hero.split('npc_dota_hero_')[1]}_sb.png`} />
              </td>
              <td>
                {hero.split('npc_dota_hero_')[1]}
              </td>
              <td>
                {winByHero[hero]}
              </td>
              <td>
                {matches.reduce((acc, match) => {
                  if (match.players.some(player => ((player.team_number === 1 && !match.radiant_win) || (player.team_number === 0 && match.radiant_win)) && player.hero_name === hero)) {
                    acc += 1
                  }
                  return acc
                }, 0) / (matches.length - matches.reduce((acc, match) => {
                  if (match.players.every(player => player.hero_name !== hero)) {
                    acc += 1
                  }
                  return acc
                }, 0)) * 100}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default HeroWinRateTable
