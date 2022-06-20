import React from 'react';

import styles from './List.module.css';

type Props = {
  itemsCount: number;
  itemHeight: number;
  windowHeight: number;
  renderItem: (props: {index: number; style: React.CSSProperties}) => React.ReactNode;
}

const List: React.FC<Props> = (props) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const { itemsCount, itemHeight, renderItem, windowHeight } = props;

  const innerHeight = itemsCount * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    itemsCount - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const getItems = () => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push(
        renderItem({
          index: i,
          style: {
            position: "absolute",
            top: `${i * itemHeight}px`,
            width: "100%"
          }
        })
      );
    }
    return items;
  }

  

  const onScroll = (e: React.UIEvent) => setScrollTop(e.currentTarget.scrollTop);

  return (
    <div className={styles.wrapper} style={{ height: `${windowHeight}px` }} onScroll={onScroll}>
      <div
        className={styles.inner}
        style={{ height: `${innerHeight}px` }}
      >
        {getItems()}
      </div>
    </div>
  );
}

export default List