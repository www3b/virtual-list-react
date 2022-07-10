import React from 'react';
import { useScroll } from '../../hooks/useScroll';
import { Item } from '../Item';

import { Wrapper } from './components/Wrapper';

const BUFFER_SIZE = 2;

type Props<T> = {
  items: T[];
  renderMethod: (data: T) => React.ReactElement;
  rowHeight?: number;
  bufferSize?: number;
}

type WrappedItem<T> = {
  index: number;
  data: T;
  style: React.CSSProperties;
}

const VirtualList = <T extends {}>(props: Props<T>) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [renderItems, setRenderItems] = React.useState<WrappedItem<T>[]>([] as any);
  const [scrollMonitor, windowHeight] = useScroll(setScrollTop);

  React.useEffect(() => {
    prepareItems();
  }, [scrollTop, windowHeight]);

  const { items, rowHeight = 50, renderMethod, bufferSize = BUFFER_SIZE } = props;
  const rowsCount = items.length;
  const innerHeight = rowsCount * rowHeight;
  const startIndex = Math.floor(scrollTop / rowHeight) - bufferSize;
  const endIndex = Math.min(
    rowsCount - 1,
    Math.floor((scrollTop + windowHeight) / rowHeight) + bufferSize
  );

  const prepareItems = () => {
    const rows: WrappedItem<T>[] = [];
    for (let i = startIndex >= 0 ? startIndex : 0; i <= endIndex; i++) {
      rows.push({
        index: i,
        data: items[i],
        style: {
          position: "absolute",
          top: `${i * rowHeight}px`,
          width: "100%",
          height: `${rowHeight}px`,
        }
      });
    }
    setRenderItems(rows);
  }

  return (
    <Wrapper
      ref={scrollMonitor as React.Ref<HTMLDivElement>}
      handleScroll={setScrollTop}
      layoutHeight={innerHeight}
      windowHeight={innerHeight}
    >
      {renderItems.map((item) => (
        <Item id={item.index} key={item.index} style={item.style}>
          {renderMethod(item.data)}
        </Item>
      ))}
    </Wrapper>
  );
}

export default VirtualList;