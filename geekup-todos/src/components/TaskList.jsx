import { useUserTasksStore } from "../stores/userTasksStore";
import Task from "./Task";

export default function Tasks() {
  const error = useUserTasksStore((state) => state.error);
  const loading = useUserTasksStore((state) => state.loading);
  const userTasks = useUserTasksStore((state) => state.userTasks);

  if (loading)
    return <p className="text-stone-500 text-center">Loading tasks...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <ul>
      {userTasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}
