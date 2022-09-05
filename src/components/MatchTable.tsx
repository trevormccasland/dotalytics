import React, { FC, ReactElement } from 'react';
import { Match } from '../services/matchesClient';
import'./MatchTable.css'

type MatchTableProps = {
    match: Match
}

const MatchTable : FC<MatchTableProps> = ({match}): ReactElement => {
    return (
      <div>
          <h2 className='Header'>Match ID: {match.match_id} Date: {new Date(match.start_time * 1000).toDateString()}</h2>
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
                {match.players.map(player => {
                  return (
                    <tr>
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

export default MatchTable;