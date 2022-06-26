import { useCallback, useEffect, useMemo } from "react";

type MeasureCallback = (entry: ResizeObserverEntry) => void;

export const useObserver = (measure: MeasureCallback, deps: any[] = []) => {
  const measureItem = useCallback((entries: ResizeObserverEntry[]) => {
    if (!entries?.length) {
      return;
    }
    measure(entries[0])
  }, [measure, ...deps]);

  const observer = useMemo(() => new ResizeObserver(measureItem), [
    measureItem,
    ...deps
  ]);

  useEffect(() => {
    return () => {
      observer.disconnect();
    };
  }, [observer]);

  return observer;
};
