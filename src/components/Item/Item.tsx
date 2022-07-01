import React from 'react';
import { withMeasure, WithMeasureProps } from '../WithMeasure';

export type Props = React.PropsWithChildren<WithMeasureProps>;

const Item: React.FC<Props> = (props) => (
  <div>
    {props.children}
  </div>
);

export default withMeasure(Item);
