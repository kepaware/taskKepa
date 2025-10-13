import { format } from "date-fns";

export function DateFunctions() {
  function getFullDate() {
    const date = format(Date.now(), "eeee, dd MMMM yyyy");
    return date;
  }

  function getShortDate() {
    const date = format(Date.now(), "dd/MM/yy");
    return date;
  }

  return { getFullDate, getShortDate };
}
