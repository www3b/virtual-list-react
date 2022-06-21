type CallbackType = (...arg: any[]) => any;

export function throttle<T extends CallbackType>(fn: T, delay: number): CallbackType {
  let lastCall = 0;

  return function (...args) {
    const now = (new Date()).getTime();
    if (lastCall !== 0 && (now - lastCall) < delay) {
      return;
    }
    lastCall = now;

    fn(...args);
  }
};
