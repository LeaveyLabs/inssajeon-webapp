//https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update?rq=1
import { useEffect, useRef } from "react";

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export const useUpdateEffect = (effect: VoidFunction, dependencies: Array<any> ) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
}