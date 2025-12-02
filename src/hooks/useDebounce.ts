import { useEffect } from "react";
export const useDebounce = (cb: () => void, delay: number, deps: any[]) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      cb();
    }, delay);

    return () => clearTimeout(timer);
  }, [cb, delay, ...deps]);
}