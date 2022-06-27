import React from 'react';

import { useScroll } from '../../../../hooks/useScroll';

import styles from './Wrapper.module.css';

type Props = React.PropsWithChildren<{
  windowHeight: number;
  layoutHeight: number;
  handleScroll: (offset: number) => void;
}>;

const Wrapper: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  return (
    <div ref={ref} className={styles.wrapper}>
      <div style={{ height: props.layoutHeight }}>
        <div className={styles.inner}>
          {props.children}
        </div>
      </div>
    </div>
  )
};

export default React.forwardRef(Wrapper);
