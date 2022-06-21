import React from 'react';
import { throttle } from '../../utils/throttle';
import { Wrapper } from './components/Wrapper';
// import throttle from 'lodash/throttle';

import styles from './List.module.css';

type Props = {
  itemsCount: number;
  itemHeight: number;
  windowHeight: number;
  renderItem: (props: { index: number; style: React.CSSProperties }) => React.ReactNode;
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

  return (
    <Wrapper handleScroll={setScrollTop} layoutHeight={innerHeight} windowHeight={windowHeight}>
        {getItems()}
    </Wrapper>
  );
}

export default List