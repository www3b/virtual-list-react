import { useContext, useState } from 'react';

import { MeasuredContext } from '../../data/MeasureContext';
import { useMeasurement } from '../../hooks/useMeasurement';

const EMPTY = { height: 0, width: 0 }

export type WithMeasureProps = {
  style: React.CSSProperties;
  id: number;
};

export function withMeasure<T extends WithMeasureProps = WithMeasureProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return function Wrapper(props: T) {
    const { style, id } = props;
    const context = useContext(MeasuredContext);
    const [measureId] = useState(() =>
      id === undefined ? context.measuredId++ : id
    )
    const [size, attach] = useMeasurement();
    const existing = context.sizes[measureId] || EMPTY;

    if (size && (size.height > 0 && size.height !== existing.height)) {
      if (existing === EMPTY) {
        context.count++
      }
      context.total -= existing.height
      context.total += size.height
      context.sizes[measureId] = size
      context.changed()
    }

    console.log(size);
    return (
      <div key={measureId} style={style} ref={attach as any}>
        <WrappedComponent {...(props as T)} />
      </div>
    );
  };
}