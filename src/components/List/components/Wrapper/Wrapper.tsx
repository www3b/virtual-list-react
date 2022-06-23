import React from 'react';

import { throttle } from '../../../../utils/throttle';

import styles from './Wrapper.module.css';

type Props = React.PropsWithChildren<{
  windowHeight: number;
  layoutHeight: number;
  handleScroll: (offset: number) => void;
}>;

const Wrapper: React.FC<Props> = (props) => {
  const onScroll = throttle((e: React.UIEvent) => {
    props.handleScroll(e.currentTarget.scrollTop);
  }, 100);

  return (
    <div className={styles.wrapper} style={{ height: `${props.windowHeight}px` }} onScroll={onScroll}>
      <div
        className={styles.inner}
        style={{ height: `${props.layoutHeight}px` }}
      >
        {props.children}
      </div>
    </div>
  )
};

export default Wrapper;
