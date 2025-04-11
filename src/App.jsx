import { useState } from "react";

const movies = [
  { title: "Iron Man", poster: "https://m.media-amazon.com/images/M/MV5BMTkzMDU3NTQyOV5BMl5BanBnXkFtZTcwNTU0NTIzMw@@._V1_.jpg" },
  { title: "The Incredible Hulk", poster: "https://m.media-amazon.com/images/M/MV5BMTM5NTUzNDYyM15BMl5BanBnXkFtZTcwNzM4ODI3MQ@@._V1_.jpg" },
  { title: "Iron Man 2", poster: "https://m.media-amazon.com/images/M/MV5BMjI1NjY1NzQxNV5BMl5BanBnXkFtZTcwNTM0NTY0Mw@@._V1_.jpg" },
  { title: "Thor", poster: "https://m.media-amazon.com/images/M/MV5BMTM2NTI5NzY5NF5BMl5BanBnXkFtZTcwODg2MjcyNA@@._V1_.jpg" },
  { title: "Captain America: The First Avenger", poster: "https://m.media-amazon.com/images/M/MV5BMjEyMjYxNzQ3Ml5BMl5BanBnXkFtZTcwNzU1NzYxNQ@@._V1_.jpg" },
  { title: "The Avengers", poster: "https://m.media-amazon.com/images/M/MV5BMTk4NDQzNzU0Ml5BMl5BanBnXkFtZTcwNTg0NjQzNw@@._V1_.jpg" },
  { title: "Iron Man 3", poster: "https://m.media-amazon.com/images/M/MV5BMTg5NTY3NzI4OV5BMl5BanBnXkFtZTcwNTg4Mjg3OA@@._V1_.jpg" },
  { title: "Thor: The Dark World", poster: "https://m.media-amazon.com/images/M/MV5BMjI1ODAwNjAwNV5BMl5BanBnXkFtZTgwOTUzMzQxMDE@._V1_.jpg" },
  { title: "Captain America: The Winter Soldier", poster: "https://m.media-amazon.com/images/M/MV5BMTQ4NzA1NzU2MF5BMl5BanBnXkFtZTgwNjk4OTY1MTE@._V1_.jpg" },
  { title: "Guardians of the Galaxy", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMjgxNzM1Nl5BMl5BanBnXkFtZTgwNjk5NjQ3MTE@._V1_.jpg" },
  { title: "Avengers: Age of Ultron", poster: "https://m.media-amazon.com/images/M/MV5BMjM4NzYzMjE3MF5BMl5BanBnXkFtZTgwMjY3NzYzNDE@._V1_.jpg" },
  { title: "Ant-Man", poster: "https://m.media-amazon.com/images/M/MV5BMTg3NDQ5MTI2M15BMl5BanBnXkFtZTgwNjQxODI3NTE@._V1_.jpg" },
  { title: "Captain America: Civil War", poster: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2NDMxM15BMl5BanBnXkFtZTgwNjUzMzQ1ODE@._V1_.jpg" },
  { title: "Doctor Strange", poster: "https://m.media-amazon.com/images/M/MV5BMjQzNzYzNjI5NV5BMl5BanBnXkFtZTgwMzU3NzYzMDI@._V1_.jpg" },
  { title: "Guardians of the Galaxy Vol. 2", poster: "https://m.media-amazon.com/images/M/MV5BMjM0NjYxNzAyOV5BMl5BanBnXkFtZTgwOTk2NjYzMTI@._V1_.jpg" },
  { title: "Spider-Man: Homecoming", poster: "https://m.media-amazon.com/images/M/MV5BMjA5Nzg4ODAzNV5BMl5BanBnXkFtZTgwMjczOTYzMjI@._V1_.jpg" },
  { title: "Thor: Ragnarok", poster: "https://m.media-amazon.com/images/M/MV5BNjViNWY4MjAtYjE1Mi00ZDFmLTk2NzktOTAxNDg5MjAxZWI1XkEyXkFqcGdeQXVyNzY1NzE4Nzg@._V1_.jpg" },
  { title: "Black Panther", poster: "https://m.media-amazon.com/images/M/MV5BMTg1NTU2MDY2MF5BMl5BanBnXkFtZTgwMTc2NTc5MzI@._V1_.jpg" },
  { title: "Avengers: Infinity War", poster: "https://m.media-amazon.com/images/M/MV5BMTc5Mzc5MjA0MV5BMl5BanBnXkFtZTgwMzY3OTUzNTM@._V1_.jpg" },
  { title: "Ant-Man and the Wasp", poster: "https://m.media-amazon.com/images/M/MV5BMTc4MzQ4MTI2M15BMl5BanBnXkFtZTgwNzUwOTk5NTM@._V1_.jpg" },
  { title: "Captain Marvel", poster: "https://m.media-amazon.com/images/M/MV5BMjMxNjYxNTM4NF5BMl5BanBnXkFtZTgwNzU5NzU3NzM@._V1_.jpg" },
  { title: "Avengers: Endgame", poster: "https://m.media-amazon.com/images/M/MV5BMTc5NDQxNjc2Ml5BMl5BanBnXkFtZTgwODk5OTk5NzM@._V1_.jpg" },
  { title: "Spider-Man: Far From Home", poster: "https://m.media-amazon.com/images/M/MV5BMjA2NzQzNzY4MF5BMl5BanBnXkFtZTgwOTYzMzU1NzM@._V1_.jpg" },
  { title: "Black Widow", poster: "https://m.media-amazon.com/images/M/MV5BM2QyMTJlMDctYTJjNC00OGNhLTk2OTItZTI0NzljNjQyZTY3XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" },
  { title: "Shang-Chi and the Legend of the Ten Rings", poster: "https://m.media-amazon.com/images/M/MV5BZjg2YTkzYmEtNTE3ZC00OGEyLWE4MzYtNDI1YjZjMDljNjQzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" },
  { title: "Eternals", poster: "https://m.media-amazon.com/images/M/MV5BZTQ3NDY3YjUtZTkzOC00MDkyLTg5YzUtZGM2YzdlZTQzNzM3XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" },
  { title: "Spider-Man: No Way Home", poster: "https://m.media-amazon.com/images/M/MV5BZGU5NjUwNmEtNDFlMy00YjlhLWExN2EtYTgxNjc0NTMyNzA4XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Doctor Strange in the Multiverse of Madness", poster: "https://m.media-amazon.com/images/M/MV5BM2Y3NDIxZTctM2MyYy00MWZjLTg2ZDAtMzIxN2UwYzI1YjMxXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Thor: Love and Thunder", poster: "https://m.media-amazon.com/images/M/MV5BM2FkZjE4ZDQtZGMxYy00OTI4LWI2NTAtZjEyODNlNTY4ZTI1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Black Panther: Wakanda Forever", poster: "https://m.media-amazon.com/images/M/MV5BMDA0MTVkZDEtZGVhYi00NzY0LWI2ZTctYjI3NDMyYTFiMjkwXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Ant-Man and the Wasp: Quantumania", poster: "https://m.media-amazon.com/images/M/MV5BYjI0ODdlNzktZTViYy00ODNjLWFjM2ItY2Y0OTdjYjIxNjg5XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Guardians of the Galaxy Vol. 3", poster: "https://m.media-amazon.com/images/M/MV5BOWJjYzY3NmEtM2EzZC00ZTM5LWFjZjgtNTNkNzE2Y2IxMjU1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "The Marvels", poster: "https://m.media-amazon.com/images/M/MV5BZGVlNmY0ZjItN2NiNi00YzYzLTlmZDMtNzY0MzJkZGMxZTliXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Deadpool & Wolverine", poster: "https://m.media-amazon.com/images/M/MV5BZDg4YjY2NzItYjYzNC00YjY0LTg1YjEtYzE3ZTA5YjYxYjY1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Captain America: Brave New World", poster: "https://m.media-amazon.com/images/M/MV5BNzY3ZDYxYjEtMzY4Ni00YjYxLWI1NzAtYzQzYjY1YjYxYjY1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" },
  { title: "Thunderbolts", poster: "https://m.media-amazon.com/images/M/MV5BZjY3ZDYxYjEtMzY4Ni00YjYxLWI1NzAtYzQzYjY1YjYxYjY1XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg" }
];

const shownPairs = new Set();

function getRandomPair() {
  let i1, i2;
  let attempts = 0;
  do {
    i1 = Math.floor(Math.random() * movies.length);
    i2 = Math.floor(Math.random() * movies.length);
    attempts++;
  } while ((i1 === i2 || shownPairs.has(`${i1},${i2}`) || shownPairs.has(`${i2},${i1}`)) && attempts < 100);

  shownPairs.add(`${i1},${i2}`);
  return [i1, i2];
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
    setPair(getRandomPair());
  };

  const ranked = [...movies.map((m, i) => ({ ...m, score: scores[i] }))].sort((a, b) => b.score - a.score);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', backgroundColor: '#1f2937', color: '#f9fafb', minHeight: '100vh' }}>
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
              border: '1px solid #4b5563',
              borderRadius: '12px',
              padding: '1rem',
              backgroundColor: '#374151',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            <img
              src={movies[i].poster}
              alt={movies[i].title}
              style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '12px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
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
