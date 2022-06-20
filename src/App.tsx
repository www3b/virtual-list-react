import React from 'react';

import { Item } from './components/Item';
import { List } from './components/List';

const App: React.FC = () => {
  const items = new Array(100000).fill(1);
  return (
    <div className="App">
      <List
        itemHeight={30}
        itemsCount={items.length}
        renderItem={Item}
        windowHeight={100}
      />
    </div>
  );
}

export default App;
