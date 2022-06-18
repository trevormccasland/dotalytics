import React, { useEffect, useState } from 'react';
import { getMatches, Matches } from './services/matchesClient';
import './App.css';

function App() {
  const [matches, setMatches] = useState([] as Matches)
  useEffect(() => {
    const fetchMatches = async () => {
      setMatches(await getMatches())
    }
    fetchMatches()
  }, [])
  return (
    <div className="App">
      {matches.map(match => {
        return (
          <div>
            <div>Match ID: {match.match_id}</div>
            <table className="matchesTable">
              <thead>
                <tr>
                  <th>
                    Hero Name
                  </th>
                  <th>
                    Net Worth
                  </th>
                </tr>
              </thead>
              <tbody> 
                  {match.players.map(player => {
                    return (
                      <tr>
                        <td>
                          {player.hero_name.split('npc_dota_hero_')[1]}
                        </td>
                        <td>
                          {player.net_worth}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  );
}

export default App;
