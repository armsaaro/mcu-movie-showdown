import { useState, useEffect } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const movies = [
  // full list unchanged for brevity
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
    setItems((prev) => [title, ...prev.filter(t => t !== title)]);
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
    const blob = new Blob([lines.join("\n")], { type: "te
