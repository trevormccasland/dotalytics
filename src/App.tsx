import React, { useEffect, useState, ReactElement } from 'react'
import { Route } from 'wouter'
import { getMatches, Match, Matches } from './services/matchesClient'
import './App.css'
import MatchTable from './components/MatchTable'
import MatchesRequestedInput from './components/MatchesRequestedInput'
import KillsChart from './components/KillsChart'
import HeroPicksChart from './components/HeroPicksChart'
import MatchDetails from './components/MatchDetails'
import TopBar from './components/TopBar'
import BanPicksChart from './components/BanPicksChart'
import ItemWinProbabilityTable from './components/ItemWinProbabilityTable'

function App (): ReactElement {
  const [matches, setMatches] = useState([] as Matches)
  const [matchesRequested, setMatchesRequested] = useState(5)
  const [loading, setLoading] = useState(true)
  const [accountId, setAccountId] = useState('120525879')

  useEffect(() => {
    const fetchMatches = async (): Promise<void> => {
      setLoading(true)
      setMatches(await getMatches(matchesRequested, accountId))
      setLoading(false)
    }
    fetchMatches()
  }, [matchesRequested, accountId])

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => setMatchesRequested(parseInt(e.target.value))
  const accountIdInputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => setAccountId(e.target.value)

  return (
    <>
      <Route path='/' >
        <div className="App">
          <TopBar title={`Displaying the last ${matchesRequested} games`}>
            <div className='AccountIdInput'>
              <label className='accountIdLabel'>Account ID</label>
              <input value={accountId} onChange={accountIdInputOnChange} />
            </div>
            <MatchesRequestedInput selectOnChange={selectOnChange} />
          </TopBar>
          {loading && <h2 className='loadingHeader'>loading ...</h2>}
          {!loading && (
            <div className='dataContainer'>
              <KillsChart matches={matches} />
              <HeroPicksChart matches={matches} />
              <BanPicksChart matches={matches} />
              {matches.map(match => {
                return <MatchTable key={match.match_id} match={match} />
              })}
              <ItemWinProbabilityTable matches={matches} />
            </div>
          )}
        </div>
      </Route>
      <Route path='/matches/:matchId'>
        {(params) => <MatchDetails match={matches.find(match => match.match_id.toString() === params.matchId) as Match} />}
      </Route>
    </>
  )
}

export default App
