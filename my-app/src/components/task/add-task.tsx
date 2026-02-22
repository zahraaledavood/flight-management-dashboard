import { useState } from "react";
import { useTasksDispatch } from "../context/task-context";

export const AddTask = () => {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-transparent border border-zinc-200 rounded px-1"
        placeholder="Add a new task"
      />
      <button
        onClick={() => {
          setText("");
          dispatch({
            type: "added",
            id: Date.now(),
            text: text,
          });
        }}
        className="bg-green-500 text-white rounded text-sm border p-1"
      >
        Add
      </button>
    </>
  );
};
