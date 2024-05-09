import { useUserTasksStore } from "../stores/userTasksStore";
import TaskList from "./TaskList";

export default function UserTaskList() {
  const userId = useUserTasksStore((state) => state.userId);

  return (
    <div className="border border-stone-200 px-6 py-4 rounded-md h-96 overflow-y-auto divide-y">
      {userId ? (
        <TaskList />
      ) : (
        <p className="text-stone-500 text-lg text-center">
          Select a user to see their tasks
        </p>
      )}
    </div>
  );
}
