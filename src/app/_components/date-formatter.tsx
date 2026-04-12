import { parseISO, format } from "date-fns";

type Props = {
  dateString: string | Date;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
  const dateTime = typeof dateString === "string" ? dateString : date.toISOString();

  return <time dateTime={dateTime}>{format(date, "LLLL\td, yyyy")}</time>;
};

export default DateFormatter;
