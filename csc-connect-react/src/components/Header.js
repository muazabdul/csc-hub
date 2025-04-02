import React from 'react';

function Header(props) {
  return (
    <header>
      <h1>{props.title}</h1>
      <nav>
        <a href="/">Home</a>

        <a href="/posters">Posters</a>
       
        <a href="/forum">Forum</a>
      </nav>
    </header>
  );
}

export default Header;