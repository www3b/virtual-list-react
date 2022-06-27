export function throttle<T extends Function>(fn: T, delay: number): T {
  let lastCall = 0;

  function callable(...args: any[]) {
    const now = (new Date()).getTime();
    if (lastCall !== 0 && (now - lastCall) < delay) {
      return;
    }
    lastCall = now;

    fn(...args);
  }
  return callable as any;
};
