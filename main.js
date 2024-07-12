import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutoMatch = () => {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/players')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handlePlayerSelect = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
  };

  const handleMatchCreate = () => {
    axios.post('https://api.example.com/matches', {
      players: selectedPlayers,
    })
      .then(response => {
        setMatchId(response.data.id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleMatchUpdate = () => {
    axios.put(`https://api.example.com/matches/${matchId}`, {
      players: selectedPlayers,
    })
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleMatchDelete = () => {
    axios.delete(`https://api.example.com/matches/${matchId}`)
      .then(response => {
        setMatchId(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Auto Match</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <input
              type="checkbox"
              checked={selectedPlayers.includes(player)}
              onChange={() => handlePlayerSelect(player)}
            />
            {player.name}
          </li>
        ))}
      </ul>
      <button onClick={handleMatchCreate}>Create Match</button>
      {matchId && (
        <div>
          <h2>Match {matchId}</h2>
          <ul>
            {matches.map((match) => (
              <li key={match.id}>
                {match.players.map((player) => (
                  <span key={player.id}>{player.name}</span>
                ))}
              </li>
            ))}
          </ul>
          <button onClick={handleMatchUpdate}>Update Match</button>
          <button onClick={handleMatchDelete}>Delete Match</button>
        </div>
      )}
    </div>
  );
};

export default AutoMatch;
