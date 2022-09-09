import React, { useEffect, useState } from 'react';
import { getMatches, Matches } from './services/matchesClient';
import './App.css';
import MatchTable from './components/MatchTable';
import MatchesRequestedInput from './components/MatchesRequestedInput';
import KillsChart from './components/KillsChart';
import HeroPicksChart from './components/HeroPicksChart';

function App() {
  const [matches, setMatches] = useState([] as Matches)
  const [matchesRequested, setMatchesRequested] = useState(5)
  const [loading, setLoading] = useState(true)
  const [accountId, setAccountId] = useState('120525879')

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      setMatches(await getMatches(matchesRequested, accountId))
      setLoading(false)
    }
    fetchMatches()
  }, [matchesRequested, accountId])

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => setMatchesRequested(parseInt(e.target.value))
  const accountIdInputOnChange = (e :React.ChangeEvent<HTMLInputElement>) => setAccountId(e.target.value)
  
  
  return (
    <div className="App">
      <div className="TopBar">
        <h1 className='pageHeader'>{`Displaying the last ${matchesRequested} games`}</h1>
        <div className='AccountIdInput'>
          <label className='accountIdLabel'>Account ID</label>
          <input value={accountId} onChange={accountIdInputOnChange} />
        </div>
        <MatchesRequestedInput selectOnChange={selectOnChange} />
      </div>
      {loading && <h2 className='loadingHeader'>loading ...</h2>}
      {!loading && (
        <div className='dataContainer'>
          <KillsChart matches={matches} />
          <HeroPicksChart matches={matches} />
        
          {matches.map(match => {
            return <MatchTable key={match.match_id} match={match} />
          })}
        </div>
      )}
    </div>
  );
}

export default App;
