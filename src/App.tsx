import React from 'react';

import cache from './utils/cache';

import { Item } from './components/Item';
import { List } from './components/List';

const App: React.FC = () => {
  const items = new Array(10000).fill(1);
  return (
    <div className="App">
      <List
        rowHeight={50}
        rowsCount={items.length}
        renderItem={Item}
        windowHeight={300}
      />
    </div>
  );
}

export default App;
