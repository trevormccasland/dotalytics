import config from '../config.json'
import { Config } from '../types'

export type Matches = Match[]

export interface Match {
  players: Player[]
  radiant_win: boolean
  duration: number
  pre_game_duration: number
  start_time: number
  match_id: number
  match_seq_num: number
  tower_status_radiant: number
  tower_status_dire: number
  barracks_status_radiant: number
  barracks_status_dire: number
  cluster: number
  first_blood_time: number
  lobby_type: number
  human_players: number
  leagueid: number
  positive_votes: number
  negative_votes: number
  game_mode: number
  flags: number
  engine: number
  radiant_score: number
  dire_score: number
  picks_bans: PicksBan[]
}

export interface Player {
  player_slot: number
  team_number: number
  hero_id: number
  item_0: number
  item_1: number
  item_2: number
  item_3: number
  item_4: number
  item_5: number
  backpack_0: number
  backpack_1: number
  backpack_2: number
  item_neutral: number
  kills: number
  deaths: number
  assists: number
  leaver_status: number
  last_hits: number
  denies: number
  gold_per_min: number
  xp_per_min: number
  level: number
  net_worth: number
  aghanims_scepter: number
  aghanims_shard: number
  moonshard: number
  hero_damage: number
  tower_damage: number
  hero_healing: number
  gold: number
  gold_spent: number
  scaled_hero_damage: number
  scaled_tower_damage: number
  scaled_hero_healing: number
  item_neutral_name: string
  hero_name: string
  item_0_name: string
  item_1_name: string
  item_2_name: string
  item_3_name: string
  item_4_name: string
  item_5_name: string
  backpack_0_name: string
  backpack_1_name: string
  backpack_2_name: string
}

export interface PicksBan {
  is_pick: boolean
  hero_id: number
  team: number
  order: number
}

// account ID to test with 120525879
export const getMatches = async (matchesRequested: number, accountId: string): Promise<Matches> => {
  try {
    const projectConfig: Config = config
    const url = `http://${projectConfig.host}:${projectConfig.port}/matches?account_id=${accountId}&matches_requested=${matchesRequested}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`status ${response.status}`)
    }
    return await response.json()
  } catch (error: any) {
    console.error('error getting matchesClient.getMatches():', error)
    return []
  }
}
