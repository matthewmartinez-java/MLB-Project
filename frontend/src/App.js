import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dataType, setDataType] = useState('batting');
  const [teams, setTeams] = useState([]);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [players1, setPlayers1] = useState([]);
  const [players2, setPlayers2] = useState([]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [statOptions, setStatOptions] = useState([]);
  const [selectedStats, setSelectedStats] = useState([]);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/teams')
      .then(res => setTeams(res.data));
  }, []);

  useEffect(() => {
    if (team1) {
      axios.get('http://localhost:5000/players', {
        params: { team: team1, type: dataType }
      }).then(res => setPlayers1(res.data));
    }
  }, [team1, dataType]);

  useEffect(() => {
    if (team2) {
      axios.get('http://localhost:5000/players', {
        params: { team: team2, type: dataType }
      }).then(res => setPlayers2(res.data));
    }
  }, [team2, dataType]);

  useEffect(() => {
    axios.get('http://localhost:5000/stat-options', {
      params: { type: dataType }
    }).then(res => setStatOptions(res.data));
  }, [dataType]);

  const compare = async () => {
    const res = await axios.get('http://localhost:5000/compare_players', {
      params: {
        player1,
        player2,
        stats: selectedStats,
        type: dataType
      },
      paramsSerializer: params => {
        const query = new URLSearchParams();
        Object.keys(params).forEach(key => {
          if (Array.isArray(params[key])) {
            params[key].forEach(val => query.append(key, val));
          } else {
            query.append(key, params[key]);
          }
        });
        return query.toString();
      }
    });
    setComparison(res.data);
  };

  const getStatColor = (key) => {
    const val1 = parseFloat(comparison.player1[key]);
    const val2 = parseFloat(comparison.player2[key]);
    if (isNaN(val1) || isNaN(val2)) return ['', ''];
    if (val1 > val2) return ['lightgreen', '#ffc0cb'];
    if (val2 > val1) return ['#ffc0cb', 'lightgreen'];
    return ['', ''];
  };

  const getWinner = () => {
    let score1 = 0, score2 = 0;
    selectedStats.forEach(stat => {
      const val1 = parseFloat(comparison.player1[stat]);
      const val2 = parseFloat(comparison.player2[stat]);
      if (!isNaN(val1) && !isNaN(val2)) {
        if (val1 > val2) score1++;
        else if (val2 > val1) score2++;
      }
    });
    if (score1 > score2) return player1;
    if (score2 > score1) return player2;
    return 'Tie';
  };

  return (
    <div className="container">
      <h1>⚾ MLB Player Stat Comparison</h1>

      <section>
        <label>Stat Type: </label>
        <select value={dataType} onChange={e => setDataType(e.target.value)}>
          <option value="batting">Batting</option>
          <option value="pitching">Pitching</option>
        </select>
      </section>

      <section>
        <label>Team 1: </label>
        <select value={team1} onChange={e => setTeam1(e.target.value)}>
          <option value="">-- Select Team 1 --</option>
          {teams.map(team => <option key={team} value={team}>{team}</option>)}
        </select>

        <label style={{ marginLeft: '2rem' }}>Player 1: </label>
        <select value={player1} onChange={e => setPlayer1(e.target.value)}>
          <option value="">-- Select Player 1 --</option>
          {players1.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </section>

      <section>
        <label>Team 2: </label>
        <select value={team2} onChange={e => setTeam2(e.target.value)}>
          <option value="">-- Select Team 2 --</option>
          {teams.map(team => <option key={team} value={team}>{team}</option>)}
        </select>

        <label style={{ marginLeft: '2rem' }}>Player 2: </label>
        <select value={player2} onChange={e => setPlayer2(e.target.value)}>
          <option value="">-- Select Player 2 --</option>
          {players2.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </section>

      <section>
        <label>Select Stats to Compare:</label><br />
        <select multiple onChange={e => {
          const options = Array.from(e.target.selectedOptions).map(o => o.value);
          setSelectedStats(options);
        }}>
          {statOptions.map(stat => (
            <option key={stat} value={stat}>{stat}</option>
          ))}
        </select>
      </section>

      <button onClick={compare} disabled={!player1 || !player2 || selectedStats.length === 0}>
        Compare Players
      </button>

      {comparison && (
        <section>
          <h3>🏆 Leader: {getWinner()}</h3>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>{player1}</th>
                <th>{player2}</th>
              </tr>
            </thead>
            <tbody>
              {selectedStats.map(stat => {
                const [color1, color2] = getStatColor(stat);
                return (
                  <tr key={stat}>
                    <td>{stat}</td>
                    <td style={{ backgroundColor: color1 }}>{comparison.player1[stat]}</td>
                    <td style={{ backgroundColor: color2 }}>{comparison.player2[stat]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default App;

