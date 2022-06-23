import React from 'react';

import { Wrapper } from './components/Wrapper';

const BUFFER_SIZE = 2;

type Props = {
  rowsCount: number;
  rowHeight: number;
  windowHeight: number;
  bufferSize?: number;
  renderItem: React.FC<any>;
}

const List: React.FC<Props> = (props) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [renderItems, setRenderItems] = React.useState<any>([]);
  
  React.useEffect(() => {
    prepareItems();
  }, [scrollTop]);

  const { rowsCount, rowHeight, renderItem, windowHeight, bufferSize = BUFFER_SIZE } = props;

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
          height: "auto",
        }
      });
    }
    setRenderItems(items);
  }

  const RenderRow = renderItem;

  return (
    <Wrapper handleScroll={setScrollTop} layoutHeight={innerHeight} windowHeight={windowHeight}>
      {renderItems.map((item: any) => <RenderRow index={item.index} style={item.style} />)}
    </Wrapper>
  );
}

export default List