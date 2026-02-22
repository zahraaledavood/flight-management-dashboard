import { useState } from "react";
import { useTasks, useTasksDispatch } from "../context/task-context";

type TaskType = {
  id: number;
  text: string;
};

export const TaskList = () => {
  const tasks = useTasks();
  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </>
  );
};

const Task = ({ task }: { task: TaskType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();

  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          type="text"
          value={task.text}
          className="w-full bg-transparent border border-zinc-200 rounded px-1"
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button
          onClick={() => setIsEditing(false)}
          className="bg-transparent rounded text-sm border border-gray-500 p-1"
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <span className="text-sm list-disc py-1">
            {task.text}
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-transparent rounded text-sm border border-gray-500 py-1 px-3"
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <div className="flex gap-2">
      {taskContent}
      <button
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
        className="bg-red-500 rounded text-sm text-white border border-red-500 py-1 px-1"
      >
        Delete
      </button>
    </div>
  );
};
