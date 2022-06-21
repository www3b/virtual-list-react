import React from 'react';

import { Wrapper } from './components/Wrapper';

const DEFAULT_OFFSET = 2;

type Props = {
  itemsCount: number;
  itemHeight: number;
  windowHeight: number;
  renderItem: (props: { index: number; style: React.CSSProperties }) => React.ReactNode;
  offset?: number;
}

const List: React.FC<Props> = (props) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const { itemsCount, itemHeight, renderItem, windowHeight, offset = DEFAULT_OFFSET } = props;

  const innerHeight = itemsCount * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight) - offset;
  const endIndex = Math.min(
    itemsCount - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  ) + offset;

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

  return (
    <Wrapper handleScroll={setScrollTop} layoutHeight={innerHeight} windowHeight={windowHeight}>
        {getItems()}
    </Wrapper>
  );
}

export default List