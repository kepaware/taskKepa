import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useDatabase } from "./DBAPI";
import type { AddProps, EndProps } from "./Types";

export function useDBFunctions() {
  const { fetchAll, fetchCurrent, addTask, endTask, deleteTask } =
    useDatabase();
  const queryClient = useQueryClient();

  function useFetchTasks() {
    const {
      isPending,
      data: tasks,
      error,
    } = useQuery({
      queryKey: ["tasks"],
      queryFn: fetchAll,
    });

    return { isPending, tasks, error };
  }

  function useFetchCurrent() {
    const {
      isPending: isLoading,
      data: currentTasks,
      error,
    } = useQuery({
      queryKey: ["current"],
      queryFn: fetchCurrent,
    });

    return { isLoading, currentTasks, error };
  }

  function useAddTask() {
    const { mutate: newTask, isPending: isCreating } = useMutation({
      mutationFn: ({ task }: AddProps) => addTask({ task }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["current"] });
      },
      onError: (error) => {
        console.log("ADD TASK ERROR: ", error.message);
      },
    });
    return { isCreating, newTask };
  }

  function useEndTask() {
    const { mutate: finishTask, isPending: isUpdating } = useMutation({
      mutationFn: ({ endUpdate }: EndProps) => endTask({ endUpdate }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["current"] });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.log("END TASK ERROR: ", error.message);
      },
    });
    return { isUpdating, finishTask };
  }

  function useDeleteTask() {
    const { mutate: removeTask, isPending: isDeleting } = useMutation({
      mutationFn: (id: number) => deleteTask(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.log("DELETE TASK ERROR: ", error.message);
      },
    });
    return { isDeleting, removeTask };
  }

  return {
    useFetchTasks,
    useFetchCurrent,
    useAddTask,
    useEndTask,
    useDeleteTask,
  };
}
