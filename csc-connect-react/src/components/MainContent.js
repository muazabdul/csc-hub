import React from 'react';
import PosterList from './PosterList';

function MainContent() {
  return (
    <main>
      <p>Welcome to CSC Connect! This is the main content area.</p>
      <PosterList /> {/* Include the PosterList component here */}
    </main>
  );
}

export default MainContent;