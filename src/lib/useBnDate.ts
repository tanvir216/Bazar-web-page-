"use client";
import { useEffect, useState } from "react";
import { bnDate } from "./bn";


export function useBnDate() {
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);
  return date;
}
