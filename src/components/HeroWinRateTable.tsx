import React, { FC, ReactElement, useEffect, useState } from 'react'
import { Match } from '../services/matchesClient'

import './HeroWinRateTable.css'

interface HeroWinRateTableProps {
  matches: Match[]
}
interface Cell {
  displayValue: string
  sortableValue: string | number
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
      { displayValue: `http://cdn.dota2.com/apps/dota2/images/heroes/${heroName}_sb.png`, sortableValue: heroName },
      { displayValue: heroName, sortableValue: heroName },
      { displayValue: winByHero[hero].toString(), sortableValue: winByHero[hero] },
      { displayValue: winPercentage.toString(), sortableValue: winPercentage }
    ]
  })
  const [rows, setRows] = useState(defaultRows)

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [sortIndex, setSortIndex] = useState(2)
  useEffect(() => {
    if (sortOrder === 'desc') {
      setRows([...rows.sort((a, b) => {
        if (a[sortIndex].sortableValue === b[sortIndex].sortableValue) return 0
        return a[sortIndex].sortableValue > b[sortIndex].sortableValue ? 1 : -1
      })])
    } else {
      setRows([...rows.sort((a, b) => {
        if (a[sortIndex].sortableValue === b[sortIndex].sortableValue) return 0
        return b[sortIndex].sortableValue > a[sortIndex].sortableValue ? 1 : -1
      })])
    }
  }, [sortOrder, sortIndex])

  const updateSortIndexAndSortOrder = (index: number): void => {
    if (sortIndex !== index) {
      setSortIndex(index)
    } else {
      if (sortOrder === 'desc') {
        setSortOrder('asc')
      } else {
        setSortOrder('desc')
      }
    }
  }
  const onHeroNameClick = (): void => {
    updateSortIndexAndSortOrder(1)
  }
  const onHeroWinsClick = (): void => {
    updateSortIndexAndSortOrder(2)
  }
  const onHeroWinPercentageClick = (): void => {
    updateSortIndexAndSortOrder(3)
  }
  const getSortIcon = (index: number): string | undefined => {
    if (sortIndex !== index) return undefined
    return sortOrder === 'asc' ? '👇' : '👆'
  }
  return (
    <table className='heroWinRateTable'>
      <thead className='tableHeader'>
        <tr>
          <th>
            Photo
          </th>
          <th>
            <button onClick={onHeroNameClick}>
              Hero Name
            </button>
            {getSortIcon(1)}
          </th>
          <th>
            <button onClick={onHeroWinsClick}>
              # Hero Wins
            </button>
            {getSortIcon(2)}
          </th>
          <th>
            <button onClick={onHeroWinPercentageClick}>
              Hero Win %
            </button>
            {getSortIcon(3)}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
          <td>
            <img src={row[0].displayValue} />
          </td>
          <td>
            {row[1].displayValue}
          </td>
          <td>
            {row[2].displayValue}
          </td>
          <td>
            {row[3].displayValue}
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  )
}

export default HeroWinRateTable
