import dayjs from 'dayjs'
import { scheduleNew } from '../../services/schedule-new.js'
import {schedulesDay} from '..//schedules/load.js'

const form = document.querySelector("form")
const clientName = document.querySelector("#client")
const selectedDate = document.querySelector("#date")

// Data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data minima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.addEventListener("submit", async (event) => {
  // Previne o comportamento padrão de carregar a página.
  event.preventDefault()

  try {
    const name = clientName.value.trim()
    
    if(!name) {
      return alert("Informe o nome do cliente")
    }

    const hourSelected = document.querySelector(".hour-selected")
    
    if(!hourSelected) {
      return alert("Selecione um horario disponivel")
    }

    const [hour] = hourSelected.innerText.split(":")
    
    const when = dayjs(selectedDate.value).add(hour, "hour")

    const id = new Date().getTime()

    await scheduleNew({
      id,
      name,
      when
    })

    await schedulesDay()
    
    clientName.value = ""
    
  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }


})