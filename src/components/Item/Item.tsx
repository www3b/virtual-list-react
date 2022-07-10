import React from 'react';

type Props = {
  children: React.ReactElement;
  style: React.CSSProperties;
  id: number;
}

const Item = (props: Props) => (
  <div key={props.id} style={props.style}>
    {props.children}
  </div>
);

export default Item;
