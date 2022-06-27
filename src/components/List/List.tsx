import React from 'react';
import { useScroll } from '../../hooks/useScroll';

import { Wrapper } from './components/Wrapper';

const BUFFER_SIZE = 2;

type Props = {
  rowsCount: number;
  renderItem: React.FC<any>;
  rowHeight?: number;
  bufferSize?: number;
}

const List: React.FC<Props> = (props) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [renderItems, setRenderItems] = React.useState<any>([]);
  const [scrollMonitor, windowHeight] = useScroll(setScrollTop);

  React.useEffect(() => {
    prepareItems();
  }, [scrollTop, windowHeight]);

  const { rowsCount, rowHeight = 50, renderItem, bufferSize = BUFFER_SIZE } = props;

  const innerHeight = rowsCount * rowHeight;
  const startIndex = Math.floor(scrollTop / rowHeight) - bufferSize;
  const endIndex = Math.min(
    rowsCount - 1,
    Math.floor((scrollTop + windowHeight) / rowHeight) + bufferSize
  );  

  const prepareItems = () => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push({
        index: i,
        style: {
          position: "absolute",
          top: `${i * rowHeight}px`,
          width: "100%",
          height: `${rowHeight}px`,
          backgroundColor: i % 2 ? 'rgb(233, 252, 230)' : 'rgb(233, 243, 255)',
        }
      });
    }    
    setRenderItems(items);
  }

  const RenderRow = renderItem;

  return (
    <Wrapper
      ref={scrollMonitor as React.Ref<HTMLDivElement>}
      handleScroll={setScrollTop}
      layoutHeight={innerHeight}
      windowHeight={innerHeight}
    >
      {renderItems.map((item: any) => <RenderRow index={item.index} style={item.style} />)}
    </Wrapper>
  );
}

export default List