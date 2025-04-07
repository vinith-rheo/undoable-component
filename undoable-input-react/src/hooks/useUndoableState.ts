import { useCallback, useState } from 'react';

export function useUndoableState<T>(initialValue: T) {
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [index, setIndex] = useState(0);

  const state = history[index];

  const setState = useCallback((newValue: T | ((prev: T) => T)) => {
    setHistory((prev) => {
      const resolvedValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev[index]) : newValue;
      const updated = prev.slice(0, index + 1);
      updated.push(resolvedValue);
      return updated;
    });
    setIndex((prevIndex) => prevIndex + 1);
  }, [index]);

  const undo = useCallback(() => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  }, []);

  const redo = useCallback(() => {
    setIndex((prevIndex) => (prevIndex < history.length - 1 ? prevIndex + 1 : prevIndex));
  }, [history.length]);

  const reset = useCallback(() => {
    setHistory([initialValue]);
    setIndex(0);
  }, [initialValue]);

  return { state, setState, undo, redo, reset, canUndo: index > 0, canRedo: index < history.length - 1 };
}
