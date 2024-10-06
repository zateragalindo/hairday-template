
import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.querySelector("#hours")

export function hoursLoad({ date, dailySChedules }) {

  hours.innerHTML = ""

  const unavailableHours = dailySChedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  const opening = openingHours.map((hour) => {
    
    const [schedulesHour] = hour.split(":")

    const isHoursPast = dayjs(date).add(schedulesHour, "hour").isBefore(dayjs())
    
    const available = !unavailableHours.includes(hour) && !isHoursPast

    return {
      hour,
      available,
    }
  })

  opening.forEach(( {hour, available }) => {
    const li = document.createElement("li")
    
    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    if(hour === "9:00") {
      hourHeaderAdd("Manhã")
    } else if (hour === "12:00") {
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite")
    }

    hours.append(li)
  
  })

  hoursClick()

}

function hourHeaderAdd(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}