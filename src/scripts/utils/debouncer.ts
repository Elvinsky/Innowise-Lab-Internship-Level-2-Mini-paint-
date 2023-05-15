export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
) {
  let timerId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
