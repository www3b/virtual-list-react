import React from 'react';

type Props = {
  index: string | number;
  style: React.CSSProperties;
}

const Item: React.FC<Props> = (props) => {
  return (
    <div style={props.style}>Item {props.index}</div>
  )
}

export default Item