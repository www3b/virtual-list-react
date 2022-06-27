import { useState, useCallback, useRef, Ref } from 'react';
import { useObserver } from './useObserver';

type SizeData = {
  width: number;
  height: number;
  element: Element;
};

export function useMeasurement(): [SizeData | undefined, Function, Element | null] {
  const [size, setSize] = useState<SizeData>();

  const measureItem = useCallback(({ contentRect, target }: ResizeObserverEntry) => {
    if (contentRect.height > 0) {
      updateSize(target, contentRect)
    }
  }, []);

  const observer = useObserver(measureItem, []);
  const currentTarget = useRef<Element | null>(null);

  const attach = useCallback((target: Element) => {
      if (!target) {
        return;
      }
      currentTarget.current = target
      observer.observe(target)
    },
    [observer]
  )

  const updateSize = (target: Element, rect: DOMRectReadOnly) => {
    setSize({
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
      element: target
    })
  }

  return [size, attach, currentTarget.current]
}