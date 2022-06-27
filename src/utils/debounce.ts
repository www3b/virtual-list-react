export function debounce<T extends Function>(callback: T, delay: number): T {
  let timer: number = 0;

  function callable(...args: any[]) {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = window.setTimeout(
        () => resolve(callback(...args)),
        delay,
      );
    });
  };

  return callable as any as T
};
