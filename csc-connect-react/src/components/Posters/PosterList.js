import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PosterList() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then((response) => response.json())
      .then((data) => setPosters(data));
  }, []);

  return (
    <div>
      <h2>Poster Library</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {posters.map((poster) => (
          <div key={poster.id} style={{ margin: '10px', width: '200px' }}>
            <img src={poster.thumbnailUrl} alt={poster.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{poster.title}</h3>
            <Link to={`/posters/${poster.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PosterList;