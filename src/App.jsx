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
  { title: "The Avengers", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/avengers.intl.125809.ar_500x749.jpg?v=1573856157" },
  { title: "Iron Man 3", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan013_1cc4a5a1-1263-4638-90ff-a3e98c6bed34_500x749.jpg?v=1672863629" },
  { title: "Thor: The Dark World", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF_KaC8MIHfSIheYhscIYE6SqD6p5-sfmrdQ&s" },
  { title: "Captain America: The Winter Soldier", poster: "https://m.media-amazon.com/images/I/818xQZGm-JL.jpg" },
  { title: "Guardians of the Galaxy", poster: "https://m.media-amazon.com/images/I/71lbFfxfMtL._AC_UF894,1000_QL80_.jpg" },
  { title: "Avengers: Age of Ultron", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/Age-of-Ultron-Movie-Poster-LEGAL_500x749.jpg?v=1666272593" },
  { title: "Ant-Man", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ant-man_97cc34db_500x749.jpg?v=1648238678" },
  { title: "Captain America: Civil War", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan003_50eb1b71-ec96-463d-ba1b-0958ffa0b4a1_500x749.jpg?v=1672337805" },
  { title: "Doctor Strange", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/scan_8a2bc9c7-440b-48e8-9984-6698e5145482_500x749.jpg?v=1698436095" },
  { title: "Guardians of the Galaxy Vol. 2", poster: "https://m.media-amazon.com/images/I/71K+P8n6sGL.jpg" },
  { title: "Spider-Man: Homecoming", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/2ac0c9778ed7723f02e3dbf6655e7c3a_b9433ad9-fd55-46e7-bb59-04a9e26616bc_500x749.jpg?v=1573617486" },
  { title: "Thor: Ragnarok", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/Thor.Ragnarok_500x749.jpg?v=1709331311" },
  { title: "Black Panther", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/black_panther_ver3_xlg_500x749.jpg?v=1738614057" },
  { title: "Avengers: Infinity War", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ItemP4338_jpg_500x749.jpg?v=1665674368" },
  { title: "Ant-Man and the Wasp", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/3b1401876d30e40c7e44de0954694c60_500x749.jpg?v=1573572635" },
  { title: "Captain Marvel", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/captainmarvel.inlt.ar_500x749.jpg?v=1616012842" },
  { title: "Avengers: Endgame", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/108b520c55e3c9760f77a06110d6a73b_500x749.jpg?v=1573652543" },
  { title: "Spider-Man: Far From Home", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/spider-man-far-from-home_hxconkmy_500x749.jpg?v=1716481475" },
  { title: "Black Widow", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/ItemP4646_jpg_500x749.jpg?v=1705609724" },
  { title: "Shang-Chi and the Legend of the Ten Rings", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/shangchi_and_the_legend_of_the_ten_rings_500x749.jpg?v=1622220347" },
  { title: "Eternals", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/eternals.ar_500x749.jpg?v=1625518100" },
  { title: "Spider-Man: No Way Home", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan007_500x749.jpg?v=1649434965" },
  { title: "Doctor Strange in the Multiverse of Madness", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/scan_1c8a56ce-79f3-4547-b2a5-b2e3fd332443_500x749.jpg?v=1701282000" },
  { title: "Thor: Love and Thunder", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan006_895a33bb-2aad-4953-8c2f-6e924cb53d43_500x749.jpg?v=1657573118" },
  { title: "Black Panther: Wakanda Forever", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDAgWsHHLYSRbKDtPXw0t9KaecFDA4oGNsA&s" },
  { title: "Ant-Man and the Wasp: Quantumania", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ant-man-and-the-wasp-quantumania_ogpmfvqi_500x749.jpg?v=1676485438" },
  { title: "Guardians of the Galaxy Vol. 3", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/guardians_of_the_galaxy_vol_three_500x749.jpg?v=1671203170" },
  { title: "The Marvels", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/the-marvels_pnk1tryd_500x749.jpg?v=1692041579" },
  { title: "Deadpool & Wolverine", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/scan_78cface5-e199-4a21-b714-4c1a6d2b20ca_500x749.jpg?v=1718312413" },
  { title: "Captain America: Brave New World", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/captain-america-brave-new-world_2reaj42x_500x749.jpg?v=1736260569" },
  { title: "Thunderbolts", poster: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/thunderbolts_drqhhatk_500x749.jpg?v=1729178427" }
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
    alert(`Moving ${title} to the top`);
    setItems((prev) => {
      const filtered = prev.filter(t => t !== title);
      return [title, ...filtered];
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
    setItems((prev) => [...prev.filter(t => t !== title), title]);
  };

  const toggleRewatch = (title) => {
    setRewatchFlags(prev => ({ ...prev, [title]: !prev[title] }));
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
