import React, { FC, ReactElement } from 'react'
import { Match } from '../services/matchesClient'
import SortableTable, { Cell, SortOrder } from './SortableTable'

interface ItemWinRateTableProps {
  matches: Match[]
}

const ItemWinRateTable: FC<ItemWinRateTableProps> = ({ matches }): ReactElement => {
  const winByItem: Record<string, number> = matches.reduce<Record<string, number>>((map, match) => {
    match.players.forEach(player => {
      if ((player.team_number === 1 && !match.radiant_win) || (player.team_number === 0 && match.radiant_win)) {
        if (player.item_0_name in map) {
          map[player.item_0_name] += 1
        } else {
          map[player.item_0_name] = 1
        }
        if (player.item_1_name in map) {
          map[player.item_1_name] += 1
        } else {
          map[player.item_1_name] = 1
        }
        if (player.item_2_name in map) {
          map[player.item_2_name] += 1
        } else {
          map[player.item_2_name] = 1
        }
        if (player.item_3_name in map) {
          map[player.item_3_name] += 1
        } else {
          map[player.item_3_name] = 1
        }
        if (player.item_4_name in map) {
          map[player.item_4_name] += 1
        } else {
          map[player.item_4_name] = 1
        }
        if (player.item_5_name in map) {
          map[player.item_5_name] += 1
        } else {
          map[player.item_5_name] = 1
        }
        if (player.item_neutral_name in map) {
          map[player.item_neutral_name] += 1
        } else {
          map[player.item_neutral_name] = 1
        }
        if (player.backpack_0_name in map) {
          map[player.backpack_0_name] += 1
        } else {
          map[player.backpack_0_name] = 1
        }
        if (player.backpack_1_name in map) {
          map[player.backpack_1_name] += 1
        } else {
          map[player.backpack_1_name] = 1
        }
        if (player.backpack_2_name in map) {
          map[player.backpack_2_name] += 1
        } else {
          map[player.backpack_2_name] = 1
        }
        if (player.aghanims_shard === 1) {
          if ('item_aghanims_shard' in map) {
            map.item_aghanims_shard += 1
          } else {
            map.item_aghanims_shard = 1
          }
        }
        if (player.aghanims_scepter === 1) {
          if ('item_aghanims_scepter' in map) {
            map.item_aghanims_scepter += 1
          } else {
            map.item_aghanims_scepter = 1
          }
        }
      }
    })
    return map
  }, {})

  const rowData: Cell[][] = Object.keys(winByItem).filter(item => item.startsWith('item')).sort((item1, item2) => winByItem[item2] - winByItem[item1]).map((item, i) => {
    const winPercentage = matches.reduce((acc, match) => {
      if (match.players.some(player => ((player.team_number === 1 && !match.radiant_win) || (player.team_number === 0 && match.radiant_win)) && (
        (item === 'item_aghanims_shard' && player.aghanims_shard === 1) || (item === 'item_aghanims_scepter' && player.aghanims_scepter === 1) || [
          player.backpack_0_name,
          player.backpack_1_name,
          player.backpack_2_name,
          player.item_0_name,
          player.item_1_name,
          player.item_2_name,
          player.item_3_name,
          player.item_4_name,
          player.item_5_name,
          player.item_neutral_name
        ].includes(item))
      )) {
        acc += 1
      }
      return acc
    }, 0) / matches.filter(match => match.players.some(player => (item === 'item_aghanims_shard' && player.aghanims_shard === 1) || (item === 'item_aghanims_scepter' && player.aghanims_scepter === 1) || [
      player.backpack_0_name,
      player.backpack_1_name,
      player.backpack_2_name,
      player.item_0_name,
      player.item_1_name,
      player.item_2_name,
      player.item_3_name,
      player.item_4_name,
      player.item_5_name,
      player.item_neutral_name
    ].includes(item))).length * 100
    return [
      { displayValue: item.split('item_')[1], sortableValue: item.split('item_')[1], isImg: false },
      { displayValue: winByItem[item].toString(), sortableValue: winByItem[item], isImg: false },
      { displayValue: winPercentage.toString(), sortableValue: winPercentage, isImg: false }
    ]
  })
  return <SortableTable columnNames={['Item Name', '# Item Wins', 'Item Win %']} defaultRows={rowData} defaultSortIndex={1} defaultSortOrder={SortOrder.ASCENDING} title={'Item Win Rate'} />
}

export default ItemWinRateTable
