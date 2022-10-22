import React, { useState, ReactElement, useEffect } from 'react'
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
import HeroWinRateTable from './components/HeroWinRateTable'
import ItemWinRateTable from './components/ItemWinRateTable'
import RadiantDireWinChart from './components/RadiantDireWinChart'
import { getUser } from './services/userClient'

function App (): ReactElement {
  const [matches, setMatches] = useState([] as Matches)
  const [matchesRequested, setMatchesRequested] = useState(5)
  const [loading, setLoading] = useState(true)
  const [accountId, setAccountId] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const fetchMatches = async (id: string): Promise<void> => {
    setError('')
    setLoading(true)
    setMatches(await getMatches(matchesRequested, id))
    setLoading(false)
  }

  const fetchUserAndMatches = async (): Promise<void> => {
    setLoading(true)
    const resp = await getUser(username)
    if (resp.steamid === null) {
      setError('Could not find steam ID for "' + username + '" make sure the custom url on your steam account is set to match your search')
      setLoading(false)
    } else {
      setAccountId(resp.steamid ?? accountId)
      await fetchMatches(resp.steamid ?? accountId)
    }
  }

  useEffect(() => {
    if (accountId !== '') fetchMatches(accountId)
  }, [matchesRequested])

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => setMatchesRequested(parseInt(e.target.value))
  const accountIdInputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => setAccountId(e.target.value)
  const usernameInputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)

  const searchOnClick = (): void => {
    if (accountId !== '') {
      fetchMatches(accountId)
    } else if (username !== '') {
      fetchUserAndMatches()
    }
  }
  return (
    <>
      <Route path='/' >
        <div className="App">
          <TopBar title={`Displaying the last ${matchesRequested} games`}>
            <div className='AppInput'>
              <label className='AppLabel'>Username</label>
              <input value={username} onChange={usernameInputOnChange} />
              <label className='AppLabel'>Steam ID</label>
              <input value={accountId} onChange={accountIdInputOnChange} />
              <button onClick={searchOnClick}>Search</button>
            </div>
            <MatchesRequestedInput selectOnChange={selectOnChange} />
          </TopBar>
          {!loading && error !== '' && <h2 className='AppHeader'>Error: {error}</h2>}
          {error === '' && accountId === '' && matches.length === 0 && <h2 className='AppHeader'>Search by Username or Steam ID</h2>}
          {error === '' && accountId !== '' && loading && <h2 className='AppHeader'>loading ...</h2>}
          {error === '' && !loading && ((matches.length > 0)
            ? (
                <div className='dataContainer'>
                  <RadiantDireWinChart matches={matches} />
                  <KillsChart matches={matches} />
                  <HeroPicksChart matches={matches} />
                  <BanPicksChart matches={matches} />
                  <ItemWinRateTable matches={matches} />
                  <HeroWinRateTable matches={matches} />
                  {matches.map(match => {
                    return <MatchTable key={match.match_id} match={match} />
                  })}
                </div>
              )
            : <h2 className='AppHeader'>No Data Available</h2>)}
        </div>
      </Route>
      <Route path='/matches/:matchId'>
        {(params) => <MatchDetails match={matches.find(match => match.match_id.toString() === params.matchId) as Match} />}
      </Route>
    </>
  )
}

export default App
