import React from 'react';
import { withMeasure, WithMeasureProps } from '../WithMeasure';

import styles from './Item.module.css';

export type Props = WithMeasureProps & {
  index: string | number;
}

const Item: React.FC<Props> = (props) => (
  <div key={props.index} className={styles.item}>
    Item {props.index}
  </div>
);

export default withMeasure(Item);
