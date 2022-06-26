import { useRef, useState, useEffect } from 'react';

import { useObserver } from './useObserver';

const AVOID_DIVIDE_BY_ZERO = 0.001;

export const useScroll = (whenScrolled: any) => {
  const [windowHeight, setWindowHeight] = useState(AVOID_DIVIDE_BY_ZERO);
  const observer = useObserver(measure);

  const scrollCallback = useRef<(_: any) => void>();
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
        scrollCallback.current({
          top: Math.floor((event.target as Element).scrollTop),
          left: Math.floor((event.target as Element).scrollLeft),
          height: (event.target as Element).scrollHeight,
          width: (event.target as Element).scrollWidth
        });
      }
    }
  };
  
  function measure({ contentRect: { height } }: ResizeObserverEntry) {
    setWindowHeight(height || AVOID_DIVIDE_BY_ZERO)
  };
  
  return [scroller, windowHeight, scroller.current];
};
