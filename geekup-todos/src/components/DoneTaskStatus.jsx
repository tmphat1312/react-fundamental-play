import { useUserTasksStore } from "../stores/userTasksStore";

export default function DoneTaskStatus() {
  const userId = useUserTasksStore((state) => state.userId);
  const userTasks = useUserTasksStore((state) => state.userTasks);
  const doneTasks = userTasks.filter((task) => task.completed).length;
  const totalTasks = userTasks.length;

  if (!userId) return <p className="">Select a user to see their tasks</p>;

  return (
    <p className="">
      Done {doneTasks}/{totalTasks} tasks
    </p>
  );
}
