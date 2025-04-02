import React, { useState } from 'react';

function PosterList() {
  const [posters, setPosters] = useState([
    { id: 1, title: 'Poster 1', imageUrl: 'placeholder1.jpg' },
    { id: 2, title: 'Poster 2', imageUrl: 'placeholder2.jpg' },
    { id: 3, title: 'Poster 3', imageUrl: 'placeholder3.jpg' },
  ]);

  return (
    <div>
      <h2>Poster List</h2>
      {posters.map((poster) => (
        <div key={poster.id}>
          <h3>{poster.title}</h3>
          <img src={poster.imageUrl} alt={poster.title} />
        </div>
      ))}
    </div>
  );
}

export default PosterList;