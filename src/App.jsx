import { useState, useEffect } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const movies = [
  { title: "Iron Man", poster: "https://www.movieposters.com/cdn/shop/products/3998dd3fa7e628e415e9805b960bec61_480x.progressive.jpg?v=1573592743" },
  { title: "The Incredible Hulk", poster: "https://www.movieposters.com/cdn/shop/files/incredible_hulk_480x.progressive.jpg?v=1739374003" },
  { title: "Iron Man 2", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9fd133ec6c57d7a7f1fa14e1e4dd30ec_a27217a9-d142-46ca-b97e-049dc82c01b0_500x749.jpg?v=1573651337" },
  { title: "Thor", poster: "https://www.movieposters.com/cdn/shop/products/a6607453074c185e645f8b4c94f57f48_480x.progressive.jpg?v=1573654008" },
  { title: "Captain America: The First Avenger", poster: "https://www.movieposters.com/cdn/shop/products/958610_2582622_480x.progressive.jpg?v=1612993182" },
  { title: "The Avengers", poster: "https://www.movieposters.com/cdn/shop/files/avengers.24x36_480x.progressive.jpg?v=1707410714" },
  { title: "Iron Man 3", poster: "" },
  { title: "Thor: The Dark World", poster: "" },
  { title: "Captain America: The Winter Soldier", poster: "" },
  { title: "Guardians of the Galaxy", poster: "https://m.media-amazon.com/images/I/71lbFfxfMtL._AC_UF894,1000_QL80_.jpg" },
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

function SortableMovie({ movie, index, moveToTop, moveToMiddle, moveToBottom, toggleRewatch, rewatchNeeded }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: movie.title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '0.5rem',
    marginBottom: '0.5rem',
    border: '1px solid #4b5563',
    borderRadius: '10px',
    backgroundColor: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    height: '120px'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '6px' }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <div style={{ flexGrow: 1 }}>
        <p style={{ color: '#f9fafb', fontWeight: '600', margin: 0 }}>{index + 1}. {movie.title}</p>
        <label style={{ fontSize: '0.8rem' }}>
          <input
            type="checkbox"
            checked={rewatchNeeded}
            onChange={() => toggleRewatch(movie.title)}
            style={{ marginRight: '0.5rem' }}
          />
          Needs rewatch
        </label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <button onClick={() => moveToTop(movie.title)} style={{ fontSize: '0.7rem' }}>Top</button>
        <button onClick={() => moveToMiddle(movie.title)} style={{ fontSize: '0.7rem' }}>Middle</button>
        <button onClick={() => moveToBottom(movie.title)} style={{ fontSize: '0.7rem' }}>Bottom</button>
      </div>
    </div>
  );
}

export default function MCUListRankingApp() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("mcu_ranking");
    return saved ? JSON.parse(saved) : movies.map(m => m.title);
  });
  const [rewatchFlags, setRewatchFlags] = useState(() => {
    const saved = localStorage.getItem("mcu_rewatch");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("mcu_ranking", JSON.stringify(items));
    localStorage.setItem("mcu_rewatch", JSON.stringify(rewatchFlags));
  }, [items, rewatchFlags]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const moveToTop = (title) => {
    setItems((prev) => {
      const filtered = prev.filter(t => t !== title);
      return [title, ...filtered];  // Place the movie at the top of the list
    });
  };
  
  const moveToMiddle = (title) => {
    setItems((prev) => {
      const filtered = prev.filter(t => t !== title);
      const middle = Math.floor(filtered.length / 2);
      return [...filtered.slice(0, middle), title, ...filtered.slice(middle)];
    });
  };
  
  const moveToBottom = (title) => {
    setItems((prev) => {
      const filtered = prev.filter(t => t !== title);
      return [...filtered, title];  // Place the movie at the bottom of the list
    });
  };

  const exportToText = () => {
    const lines = items.map((title, i) => `${i + 1}. ${title}${rewatchFlags[title] ? " (Needs rewatch)" : ""}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mcu_ranking.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetRanking = () => {
    setItems(movies.map(m => m.title));
    setRewatchFlags({});
    localStorage.removeItem("mcu_ranking");
    localStorage.removeItem("mcu_rewatch");
  };

  const rankedMovies = items.map((title) => movies.find((m) => m.title === title));

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', backgroundColor: '#111827', color: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ flex: 3 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Rank the MCU Movies</h1>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {rankedMovies.map((movie, idx) => (
              <SortableMovie
                key={movie.title}
                movie={movie}
                index={idx}
                moveToTop={moveToTop}
                moveToMiddle={moveToMiddle}
                moveToBottom={moveToBottom}
                toggleRewatch={toggleRewatch}
                rewatchNeeded={!!rewatchFlags[movie.title]}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Controls</h2>
        <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '1rem' }}>
          Your ranking is saved automatically.
        </p>
        <button onClick={() => location.reload()} style={{ marginBottom: '0.5rem', display: 'block' }}>Load Ranking (On Load)</button>
        <button onClick={exportToText} style={{ marginBottom: '0.5rem', display: 'block' }}>Export to Text</button>
        <button onClick={resetRanking} style={{ marginBottom: '0.5rem', display: 'block' }}>Reset</button>
      </div>
    </div>
  );
}
