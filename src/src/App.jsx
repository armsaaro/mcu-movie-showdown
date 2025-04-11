import { useState } from "react";

const movies = [
  { title: "Iron Man", poster: "https://m.media-amazon.com/images/M/MV5BMTkzMDU3NTQyOV5BMl5BanBnXkFtZTcwNTU0NTIzMw@@._V1_.jpg" },
  { title: "The Incredible Hulk", poster: "https://m.media-amazon.com/images/M/MV5BMTM5NTUzNDYyM15BMl5BanBnXkFtZTcwNzM4ODI3MQ@@._V1_.jpg" },
  { title: "Iron Man 2", poster: "https://m.media-amazon.com/images/M/MV5BMjI1NjY1NzQxNV5BMl5BanBnXkFtZTcwNTM0NTY0Mw@@._V1_.jpg" },
  { title: "Thor", poster: "https://m.media-amazon.com/images/M/MV5BMTM2NTI5NzY5NF5BMl5BanBnXkFtZTcwODg2MjcyNA@@._V1_.jpg" },
  { title: "Captain America: The First Avenger", poster: "https://m.media-amazon.com/images/M/MV5BMjEyMjYxNzQ3Ml5BMl5BanBnXkFtZTcwNzU1NzYxNQ@@._V1_.jpg" },
  { title: "The Avengers", poster: "https://m.media-amazon.com/images/M/MV5BMTk4NDQzNzU0Ml5BMl5BanBnXkFtZTcwNTg0NjQzNw@@._V1_.jpg" },
  // ... (remaining movies here)
];

function getRandomPair(excludeIndex) {
  let first = Math.floor(Math.random() * movies.length);
  let second;
  do {
    second = Math.floor(Math.random() * movies.length);
  } while (second === first || second === excludeIndex);
  return [first, second];
}

export default function MCUComparisonApp() {
  const [scores, setScores] = useState(Array(movies.length).fill(1000));
  const [[i1, i2], setPair] = useState(getRandomPair());

  const handleChoice = (winnerIndex) => {
    const loserIndex = winnerIndex === i1 ? i2 : i1;
    const s = [...scores];
    const expectedWin = 1 / (1 + Math.pow(10, (s[loserIndex] - s[winnerIndex]) / 400));
    s[winnerIndex] += 32 * (1 - expectedWin);
    s[loserIndex] -= 32 * (1 - expectedWin);
    setScores(s);
    setPair(getRandomPair(winnerIndex));
  };

  const ranked = [...movies.map((m, i) => ({ ...m, score: scores[i] }))].sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>MCU Movie Showdown</h1>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        {[i1, i2].map((i) => (
          <div
            key={i}
            onClick={() => handleChoice(i)}
            style={{
              flex: 1,
              cursor: 'pointer',
              textAlign: 'center',
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '1rem',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={movies[i].poster}
              alt={movies[i].title}
              style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <p style={{ marginTop: '1rem', fontWeight: '600' }}>{movies[i].title}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Current Rankings</h2>
        <ul style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
          {ranked.map((m, idx) => (
            <li key={m.title} style={{ fontSize: '0.95rem' }}>{idx + 1}. {m.title} ({Math.round(m.score)})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
