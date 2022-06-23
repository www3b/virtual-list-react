import React from 'react';

import styles from './Item.module.css';

export type Props = {
  index: string | number;
  style: React.CSSProperties;
}

const Item: React.FC<Props> = (props) => (
  <div className={styles.item} key={props.index} style={props.style}>
    Item {props.index}
  </div>
);

export default Item;
