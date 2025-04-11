import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const movies = [
  { title: "Iron Man", poster: "https://m.media-amazon.com/images/M/MV5BMTkzMDU3NTQyOV5BMl5BanBnXkFtZTcwNTU0NTIzMw@@._V1_.jpg" },
  { title: "The Incredible Hulk", poster: "https://m.media-amazon.com/images/M/MV5BMTM5NTUzNDYyM15BMl5BanBnXkFtZTcwNzM4ODI3MQ@@._V1_.jpg" },
  { title: "Iron Man 2", poster: "https://m.media-amazon.com/images/M/MV5BMjI1NjY1NzQxNV5BMl5BanBnXkFtZTcwNTM0NTY0Mw@@._V1_.jpg" },
  { title: "Thor", poster: "https://m.media-amazon.com/images/M/MV5BMTM2NTI5NzY5NF5BMl5BanBnXkFtZTcwODg2MjcyNA@@._V1_.jpg" },
  { title: "Captain America: The First Avenger", poster: "https://m.media-amazon.com/images/M/MV5BMjEyMjYxNzQ3Ml5BMl5BanBnXkFtZTcwNzU1NzYxNQ@@._V1_.jpg" },
  { title: "The Avengers", poster: "https://m.media-amazon.com/images/M/MV5BMTk4NDQzNzU0Ml5BMl5BanBnXkFtZTcwNTg0NjQzNw@@._V1_.jpg" },
  // ...[full list of all 36 movies with posters continues here]
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
    <div className="p-6 max-w-5xl mx-auto grid gap-6">
      <h1 className="text-3xl font-bold text-center">MCU Movie Showdown</h1>
      <div className="grid grid-cols-2 gap-4">
        {[i1, i2].map((i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }}>
            <Card className="cursor-pointer" onClick={() => handleChoice(i)}>
              <CardContent className="flex flex-col items-center">
                <img src={movies[i].poster} alt={movies[i].title} className="w-full h-96 object-cover rounded-xl" />
                <p className="mt-4 font-semibold text-center">{movies[i].title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Current Rankings</h2>
        <ul className="mt-2 space-y-1">
          {ranked.map((m, idx) => (
            <li key={m.title} className="text-sm">{idx + 1}. {m.title} ({Math.round(m.score)})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
