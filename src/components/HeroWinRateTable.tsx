import React, { FC, ReactElement } from 'react'
import { Match } from '../services/matchesClient'
import SortableTable, { Cell, SortOrder } from './SortableTable'

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

  const defaultRows: Cell[][] = Object.keys(winByHero).sort((hero1, hero2) => winByHero[hero2] - winByHero[hero1]).map(hero => {
    const heroName = hero.split('npc_dota_hero_')[1]
    const winPercentage = matches.reduce((acc, match) => {
      if (match.players.some(player => ((player.team_number === 1 && !match.radiant_win) || (player.team_number === 0 && match.radiant_win)) && player.hero_name === hero)) {
        acc += 1
      }
      return acc
    }, 0) / (matches.length - matches.reduce((acc, match) => {
      if (match.players.every(player => player.hero_name !== hero)) {
        acc += 1
      }
      return acc
    }, 0)) * 100
    return [
      { displayValue: `http://cdn.dota2.com/apps/dota2/images/heroes/${heroName}_sb.png`, sortableValue: heroName, isImg: true },
      { displayValue: heroName, sortableValue: heroName, isImg: false },
      { displayValue: winByHero[hero].toString(), sortableValue: winByHero[hero], isImg: false },
      { displayValue: winPercentage.toString(), sortableValue: winPercentage, isImg: false }
    ]
  })

  return <SortableTable columnNames={['Photo', 'Hero Name', '# Hero Wins', 'Hero Win %']} defaultRows={defaultRows} defaultSortIndex={2} defaultSortOrder={SortOrder.ASCENDING} />
}

export default HeroWinRateTable
