import { useSQLiteContext } from "expo-sqlite";
import type { User, Task, AddProps, EndProps } from "./Types";
import { DateFunctions } from "@/utils/DateUtils";

export function useDatabase() {
  const db = useSQLiteContext();
  const shortDate = DateFunctions().getShortDate();

  const fetchAll = async () => {
    const result: Task[] = await db.getAllAsync(
      `SELECT * FROM tasks ORDER BY due ASC `
    );
    return result;
  };

  const fetchCurrent = async () => {
    const results: Task[] = await db.getAllAsync(
      `SELECT * FROM tasks ORDER BY title ASC `
    );

    const current = results?.filter((e) => e.due === shortDate);

    return current;
  };

  const addTask = async ({ task }: AddProps) => {
    const { newTitle, newFrequency, newLast, newDue } = task;

    try {
      const data = await db.runAsync(
        "INSERT INTO tasks (title, frequency, last, due) VALUES (?, ?, ?, ?)",
        newTitle,
        newFrequency,
        newLast,
        newDue
      );

      return data.changes;
    } catch (error: any) {
      console.log("AddTaskError: ", error);
    }
  };

  const endTask = async ({ endUpdate }: EndProps) => {
    const { id, newLast, newDue } = endUpdate;

    try {
      const data = await db.runAsync(
        `UPDATE tasks SET (last, due) = (?, ?) WHERE id = ${id}`,
        newLast,
        newDue
      );
      return data.changes;
    } catch (error) {
      console.log("EndUpdateError: ", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await db.runAsync(
        `
        DELETE FROM tasks WHERE id = ?`,
        id
      );
    } catch (error) {
      console.log("DeleteError: ", error);
    }
  };

  return {
    fetchAll,
    fetchCurrent,
    addTask,
    endTask,
    deleteTask,
  };
}
