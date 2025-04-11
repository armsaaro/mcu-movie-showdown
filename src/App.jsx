import { useState } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const movies = [
  { title: "Iron Man", poster: "https://m.media-amazon.com/images/M/MV5BMTkzMDU3NTQyOV5BMl5BanBnXkFtZTcwNTU0NTIzMw@@._V1_.jpg" },
  { title: "The Incredible Hulk", poster: "https://m.media-amazon.com/images/M/MV5BMTM5NTUzNDYyM15BMl5BanBnXkFtZTcwNzM4ODI3MQ@@._V1_.jpg" },
  { title: "Iron Man 2", poster: "https://m.media-amazon.com/images/M/MV5BMjI1NjY1NzQxNV5BMl5BanBnXkFtZTcwNTM0NTY0Mw@@._V1_.jpg" },
  // ... (Add the rest of your movie list here as it is)
];

function SortableMovie({ movie, index }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: movie.title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #4b5563',
    borderRadius: '12px',
    backgroundColor: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <p style={{ color: '#f9fafb', fontWeight: '600' }}>{index + 1}. {movie.title}</p>
    </div>
  );
}

export default function MCUListRankingApp() {
  const [items, setItems] = useState(movies.map(m => m.title));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const rankedMovies = items.map((title) => movies.find((m) => m.title === title));

  return (
    <div style={{ padding: '2rem', backgroundColor: '#111827', color: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>Rank the MCU Movies</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {rankedMovies.map((movie, idx) => (
            <SortableMovie key={movie.title} movie={movie} index={idx} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
