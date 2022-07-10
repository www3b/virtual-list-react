import React from 'react';

import { VirtualList } from './components/VirtualList';

type Item = {
  index: number;
};

const items: Item[] = [];
for (let i = 0; i <= 10000; i++) {
  items.push({ index: i });
}

const App: React.FC = () => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    width: '800px',
    margin: '0 auto',
  } as const;
  const itemStyles = {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  } as const;
  return (
    <div className="App" style={styles}>
      <VirtualList<Item>
        items={items}
        renderMethod={(data) => (
          <div style={{ ...itemStyles, background: data.index % 2 ? 'rgb(29, 141, 106)' : 'rgb(227, 180, 5)' }}>
            Item {data.index}
          </div>
        )}
      />
    </div>
  );
}

export default App;
