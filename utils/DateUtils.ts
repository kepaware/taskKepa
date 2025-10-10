import { format } from "date-fns";

export function DateFunctions() {
  function getTimestamp() {
    const date = format(Date.now(), "eeee, dd MMMM yyyy");
    return date;
  }

  return { getTimestamp };
}
