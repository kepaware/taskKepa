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

  function convert(date: string) {
    //Extract Details:
    const year = date.slice(6);
    const yy = `20${year}`;
    const dd = date.slice(0, 2);
    const mm = date.slice(3, 5);

    //Convert to One String:
    const strDate = `${yy}${mm}${dd}`;

    //Convert to One Number for comparison:
    const numDate = Number(strDate);

    return numDate;
  }

  return { getFullDate, getShortDate, convert };
}
