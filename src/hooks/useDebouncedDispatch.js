import { useEffect } from "react";

export const useDebouncedDispatch = (dispatch, actionCreator, value, delay) => {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(actionCreator(value))
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [dispatch, actionCreator, value, delay]);
  
}