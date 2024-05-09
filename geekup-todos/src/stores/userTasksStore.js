import { create } from "zustand";

function comparator(a, b) {
  // Sort tasks by completed status
  if (a.completed === b.completed) return 0;
  if (a.completed) return 1;
  return -1;
}

export const useUserTasksStore = create((set, get) => ({
  userId: null,
  userTasks: [],
  cachedUserTasks: new Map(),
  loading: false,
  error: null,
  setUserTasks: (userTasks) => {
    const sortedTasks = userTasks.sort(comparator);
    get().cachedUserTasks.set(get().userId, sortedTasks);
    set({ userTasks: sortedTasks });
  },
  setUserId: async (userId) => {
    if (!userId) return set({ userId, userTasks: [] });
    if (get().cachedUserTasks.has(userId)) {
      return set({
        userId,
        userTasks: get().cachedUserTasks.get(userId),
      });
    }

    set({ userId, loading: true });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user tasks");
      }
      const userTasks = (await response.json()) ?? [];
      get().setUserTasks(userTasks);
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
  markTaskAsDone: (taskId) => {
    get().setUserTasks(
      get().userTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    get().cachedUserTasks.set(get().userId, get().userTasks);
  },
}));
