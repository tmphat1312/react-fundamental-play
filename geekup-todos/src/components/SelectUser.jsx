import { useId } from "react";
import { useFetch } from "../hooks/useFetch";
import { useUserTasksStore } from "../stores/userTasksStore";

const UNSELECTED_USER = { id: "", name: "--Please select a user-- " };

export default function SelectUser() {
  const selectId = useId();
  const { error, loading, data } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const setUserId = useUserTasksStore((state) => state.setUserId);
  const users = [UNSELECTED_USER, ...(data ?? [])];

  function handleSelectUser(event) {
    if (event.target.value == UNSELECTED_USER.id) return setUserId(null);
    setUserId(event.target.value);
  }

  if (loading) return <p className="text-stone-600">Loading users...</p>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <>
      <label htmlFor={selectId} className="sr-only">
        Choose a user
      </label>
      <select
        id={selectId}
        className="border-2 border-stone-200 rounded-md px-2 py-1 font-medium w-52"
        onChange={handleSelectUser}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </>
  );
}
