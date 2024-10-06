import dayjs from "dayjs";

const periodMoning = document.querySelector("#period-morning")
const periodAfternoon = document.querySelector("#period-afternoon")
const periodNight = document.querySelector("#period-night")


export function scheduleShow({ dailySChedules }) {
  try {
    periodMoning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    dailySChedules.forEach((schedule) => {
      const item = document.createElement("li")
      const time = document.createElement("strong")
      const name = document.createElement("span")

      item.setAttribute("data-id", schedule.id)

      time.textContent = dayjs(schedule.when).format("HH:mm")
      name.textContent = schedule.name

      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "cancelar horario")


      item.append(time, name, cancelIcon)

      const hour = dayjs(schedule.when).hour()

      if(hour <=12) {
        periodMoning.appendChild(item)
      } else if(hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }
    })

    
  } catch (error) {
    alert("Não foi possível exibir os agendamentos")
    console.log(error)
  }
}