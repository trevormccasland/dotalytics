import React, { FC, ReactElement } from 'react'
import { Match } from '../services/matchesClient'
import TopBar from './TopBar'
import { Treemap, ResponsiveContainer } from 'recharts'
import './MatchDetails.css'

interface MatchDetailsProps {
  match: Match
}

interface Child {
  name: string
  team: 'Radiant' | 'Dire'
  size: number
}

interface TreemapItem {
  name: string
  children: Child[]
}

interface Root {
  children: TreemapItem[]
}

interface CustomizedContentProps {
  x?: number
  y?: number
  width?: number
  height?: number
  index?: number
  depth?: number
  root?: Root
  name?: string
}

const CustomizedContent: FC<CustomizedContentProps> = ({ root, depth, x, y, width, height, index, name }): ReactElement => {
  depth = depth ?? 0 + 1e-10
  x = x ?? 0
  y = y ?? 0
  width = width ?? 0
  height = height ?? 0
  index = index ?? 0
  let fill = 'none'
  if (depth < 2) {
    const team = root?.children[index].children[0].team
    fill = team === 'Radiant' ? '#1ebd58' : '#e3533d'
  }
  return (
    <g>
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill,
            stroke: '#fff',
            strokeWidth: 2 / (depth),
            strokeOpacity: 1 / (depth)
          }}
        />
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={depth === 1 ? 24 : 14}>{root?.children[index].name}</text>
      </g>
    </g>
  )
}

const MatchDetails: FC<MatchDetailsProps> = ({ match }): ReactElement => {
  const killData = match.players.reduce<TreemapItem[]>((acc, player) => {
    if (player.team_number === 1) {
      const child = acc.find(child => child.name === 'Dire')
      child?.children.push({
        team: 'Dire',
        name: player.hero_name.split('npc_dota_hero_')[1].replace('_', ' '),
        size: player.kills
      })
    } else {
      const child = acc.find(child => child.name === 'Radiant')
      child?.children.push({
        team: 'Radiant',
        name: player.hero_name.split('npc_dota_hero_')[1].replace('_', ' '),
        size: player.kills
      })
    }
    return acc
  }, [
    {
      name: 'Dire',
      children: []
    },
    {
      name: 'Radiant',
      children: []
    }
  ])

  const netWorthData = match.players.reduce<TreemapItem[]>((acc, player) => {
    if (player.team_number === 1) {
      const child = acc.find(child => child.name === 'Dire')
      child?.children.push({
        team: 'Dire',
        name: player.hero_name.split('npc_dota_hero_')[1].replace('_', ' '),
        size: player.net_worth
      })
    } else {
      const child = acc.find(child => child.name === 'Radiant')
      child?.children.push({
        team: 'Radiant',
        name: player.hero_name.split('npc_dota_hero_')[1].replace('_', ' '),
        size: player.net_worth
      })
    }
    return acc
  }, [
    {
      name: 'Dire',
      children: []
    },
    {
      name: 'Radiant',
      children: []
    }
  ])

  const healingData = match.players.reduce<TreemapItem[]>((acc, player) => {
    if (player.team_number === 1) {
      const child = acc.find(child => child.name === 'Dire')
      if (player.hero_healing > 0) {
        child?.children.push({
          team: 'Dire',
          name: player.hero_name.split('npc_dota_hero_')[1].replace('_', ' '),
          size: player.hero_healing
        })
      }
    } else {
      const child = acc.find(child => child.name === 'Radiant')
      if (player.hero_healing > 0) {
        child?.children.push({
          team: 'Radiant',
          name: player.hero_name.split('npc_dota_hero_')[1].replace('_', ' '),
          size: player.hero_healing
        })
      }
    }
    return acc
  }, [
    {
      name: 'Dire',
      children: []
    },
    {
      name: 'Radiant',
      children: []
    }
  ])

  return (
    <>
      <TopBar title={`Displaying Match ${match.match_id} Details ${match.radiant_win ? 'Radiant Victory' : 'Dire Victory'}`} />
      <div className='dataContainer'>
        <h2>Kills By Hero</h2>
        <ResponsiveContainer width='100%' height={500}>
          <Treemap
            data={killData}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent />}
          />
        </ResponsiveContainer>
        <h2>Networth By Hero</h2>
        <ResponsiveContainer width='100%' height={500}>
          <Treemap
            data={netWorthData}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent />}
          />
        </ResponsiveContainer>
        <h2>Healing By Hero</h2>
        <ResponsiveContainer width='100%' height={500}>
          <Treemap
            data={healingData}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent />}
          />
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default MatchDetails
