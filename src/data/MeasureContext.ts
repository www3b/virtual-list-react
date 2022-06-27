import { createContext } from 'react';

type ContextType = {
  sizes: Record<number, any>;
  measuredId: number;
  total: number;
  count: number;
  changed: Function;
}

export const MeasuredContext = createContext<ContextType>({
  sizes: {},
  measuredId: 1,
  total: 0,
  count: 0,
  changed: () => {}
});
