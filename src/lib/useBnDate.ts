"use client";
import { useEffect, useState } from "react";
import { bnDate } from "./bn";

/** Today's date in Bangla. Set after mount so server and browser HTML match. */
export function useBnDate() {
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);
  return date;
}
