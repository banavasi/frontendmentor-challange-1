import React, { ReactNode } from "react";
import { useBearStore } from "../../store";



export type TypeTask = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: TypeTask[];
  handleCompleteTask?: (e: React.MouseEvent, i: number) => void;
  handleTaskDelete?: (i: number) => void;
  handleClearCompleteTask?: () => void;
  active?: "all" | "active" | "completed";
  setActive?: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
};

export const Task = ({ tasks }: TaskListProps) => {
  return <ul>
    {tasks.map((task:TypeTask) => (
        <TaskList key={task.id} id={task.id} text={task.text} completed={task.completed} />
    ))}
  </ul>;
};

export const TaskList = ({id,text,completed}:TypeTask) => {
const { bears } = useBearStore();

    return (
        <li className="task" data-task-id={id}>
            <div className="task__content">
                <div className="task__checkbox">
                    <input type="checkbox" />
                </div>
                <div className="task__text">
                    <p>{bears}</p>
                </div>
            </div>
            <div className="task__actions">
                <button className="task__delete">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </li>
  )
};
