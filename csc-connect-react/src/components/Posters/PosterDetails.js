import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PosterDetails() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((data) => setPoster(data));
  }, [id]);

  if (!poster) return <p>Loading...</p>;

  return (
    <div>
      <h2>Poster Details</h2>
      <img src={poster.url} alt={poster.title} style={{ width: '500px', height: 'auto' }} />
      <h3>{poster.title}</h3>
      <p>Album ID: {poster.albumId}</p>
    </div>
  );
}

export default PosterDetails;