/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext<Task[]>([]);                
const TaskDispatchContext = createContext<React.Dispatch<Action>>(() => {});

type Task ={
    id: number,
    text: string
};

type Action = | {type: 'added', id: number, text: string} 
                | {type: 'changed', task: Task} 
                | {type: 'deleted', id: number};


//  MAIN FUNCTION
export const TaskProvider = ({children}: {children: React.ReactNode}) => {
    
    const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

    return (
        <div className="flex flex-col bg-slate-600 p-5 gap-4 rounded-lg">
            <TaskContext value={tasks}>
            <TaskDispatchContext value={dispatch}>
                {children}
            </TaskDispatchContext>
             </TaskContext>
        </div>
    );
}



// Other functions
export const useTasks = ()=> {
    return useContext(TaskContext);
}

export const useTasksDispatch = () => {
    return useContext(TaskDispatchContext);
}

const taskReducer = (tasks: Task[], action: Action): Task[] => {
    switch(action.type){
        case 'added':
            return [...tasks, {
                id: action.id,
                text: action.text
         }];
        case 'changed':
            return tasks.map(task => task.id === action.task.id ? action.task : task);
        case 'deleted':
            return tasks.filter(task => task.id !== action.id);
        default:
            throw new Error('Unknown action type');
        }
}

const initialTasks = [
    {id:0, text:'Learn React', done: true}
];

