import { useSQLiteContext } from "expo-sqlite";
import type { User, Update, AddProps, Item, Toggle } from "./Types";

export function useDatabase() {
  const db = useSQLiteContext();

  async function getUser() {
    try {
      const user = await db.getFirstAsync<User>("SELECT * FROM taskusers");
      return user;
    } catch (error) {
      console.error("getUser failed: ", error);
    }
  }

  async function updateUser({ update }: Update) {
    const { id, newName } = update;

    try {
      const data = await db.runAsync(
        `UPDATE taskusers SET username = ? WHERE id = ${id}`,
        newName
      );
      return data.changes;
    } catch (error) {
      console.log("UserUpdateError: ", error);
    }
  }

  const fetchAll = async () => {
    const result: Item[] = await db.getAllAsync(
      `SELECT * FROM tasks ORDER BY title ASC `
    );
    return result;
  };

  // const fetchListItems = async () => {
  //   const result: Item[] = await db.getAllAsync(
  //     `SELECT * FROM items WHERE list = (1) ORDER BY label ASC `
  //   );
  //   return result;
  // };

  // const addItem = async ({ item }: AddProps) => {
  //   const { newLabel, newCategory } = item;
  //   const userID = 1;

  //   try {
  //     const data = await db.runAsync(
  //       "INSERT INTO items (label, category, list, user_id) VALUES (?, ?, ?, ?)",
  //       newLabel,
  //       newCategory,
  //       false,
  //       userID
  //     );

  //     console.log("Item Changes: ", data.changes);
  //     return data.changes;
  //   } catch (error: any) {
  //     console.log("ItemError: ", error);
  //     // Alert.alert("AddItemError: ", error);
  //   }
  // };

  // const deleteItem = async (id: number) => {
  //   try {
  //     await db.runAsync(
  //       `
  //       DELETE FROM items WHERE id = ?`,
  //       id
  //     );
  //   } catch (error) {
  //     console.log("DeleteError: ", error);
  //   }
  // };

  return {
    getUser,
    updateUser,
    fetchAll,
  };
}
