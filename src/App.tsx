import React from 'react';

import cache from './utils/cache';

import { Item } from './components/Item';
import { List } from './components/List';

const App: React.FC = () => {
  const items = new Array(10000).fill(1);
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  } as const;
  return (
    <div className="App" style={styles}>
      <List
        rowsCount={items.length}
        renderItem={Item}
      />
    </div>
  );
}

export default App;
