import React, { FC, ReactElement } from 'react'
import { Link } from 'wouter'
import { Match } from '../services/matchesClient'
import './MatchTable.css'

interface MatchTableProps {
  match: Match
}

const MatchTable: FC<MatchTableProps> = ({ match }): ReactElement => {
  return (
      <div>
          <div className='headerContainer'>
            <h2 className='Header'>Match ID: {match.match_id} Date: {new Date(match.start_time * 1000).toDateString()} Duration: {Math.round(match.duration / 60)} minutes {match.radiant_win ? 'Radiant Victory' : 'Dire Victory'}</h2>
            <Link className='matchesLink' href={`/matches/${match.match_id}`}>Match Details</Link>
          </div>
          <table className="matchesTable">
            <thead className='tableHeader'>
              <tr>
                <th>
                  Hero Name
                </th>
                <th>
                  Team Name
                </th>
                <th>
                  Net Worth
                </th>
                <th>
                  Kills
                </th>
                <th>
                  Deaths
                </th>
              </tr>
            </thead>
            <tbody>
                {match.players.map((player, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {player.hero_name.split('npc_dota_hero_')[1].replace('_', ' ')}
                      </td>
                      <td>
                        {player.team_number === 1 ? 'Dire' : 'Radiant'}
                      </td>
                      <td>
                        {player.net_worth}
                      </td>
                      <td>
                        {player.kills}
                      </td>
                      <td>
                        {player.deaths}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
  )
}

export default MatchTable
