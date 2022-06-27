import { useRef, useState, useEffect, Ref } from 'react';

import { useObserver } from './useObserver';

const AVOID_DIVIDE_BY_ZERO = 0.001;

type ScrollCB = (top: number) => void;

export const useScroll = (whenScrolled: ScrollCB): [
  Ref<EventTarget | undefined>,
  number,
  EventTarget | undefined
] => {
  const [windowHeight, setWindowHeight] = useState(AVOID_DIVIDE_BY_ZERO);
  const observer = useObserver(measure);

  const scrollCallback = useRef<ScrollCB>();
  const scroller = useRef<EventTarget>();
  scrollCallback.current = whenScrolled;

  useEffect(configure, [observer]);

  function configure() {
    if (!scroller.current) {
      return;
    }
    let observed = scroller.current;
    observer.observe(observed as Element)
    observed.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      observed.removeEventListener("scroll", handleScroll)
    }

    function handleScroll(event: Event) {
      if (scrollCallback.current) {
        scrollCallback.current(Math.floor((event.target as Element).scrollTop));
      }
    }
  };

  function measure({ contentRect: { height } }: ResizeObserverEntry) {
    setWindowHeight(height || AVOID_DIVIDE_BY_ZERO)
  };

  return [scroller, windowHeight, scroller.current];
};
