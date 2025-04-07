import React from 'react';
import { useUndoableState } from '../hooks/useUndoableState';

const UndoableInput = () => {
  const {
    state: text,
    setState: setText,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useUndoableState('');

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">Undoable Input</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />
      <div className="space-x-2">
        <button onClick={undo} disabled={!canUndo} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo} className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50">
          Redo
        </button>
        <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default UndoableInput;
