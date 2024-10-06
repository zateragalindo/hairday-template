import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { hoursLoad } from "../form/hours-load.js";
import { scheduleShow } from "./show.js";

const selectedDate = document.getElementById("date")

export async function schedulesDay() {
  const date = selectedDate.value

  const dailySChedules = await scheduleFetchByDay({ date })
  
  scheduleShow({ dailySChedules })

  hoursLoad({date, dailySChedules})
}