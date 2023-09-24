import React, { useState } from 'react';

export default function Index() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    alert(`${walk ? 'Stop' : 'Walk'} is the next!`)
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'green' : 'red'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
