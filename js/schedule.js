"use_strict"

const schedule = [
  {
    id: 1,
    schedule: {"Пн":["1","08:00","17:00",null,null],"Вт":["1","08:00","17:00",null,null],"Ср":["1","08:00","17:00",null,null],"Чт":["1","08:00","17:00",null,null],"Пт":["1","08:00","15:45",null,null],"Сб":["0",null,null,null,null],"Нд":["0",null,null,null,null]}
  },
  {
    id: 2,
    schedule: {"Пн":["1","08:00","17:00","12:00","12:45"],"Вт":["1","08:00","17:00","12:00","12:45"],"Ср":["1","08:00","17:00","12:00","12:45"],"Чт":["1","08:00","17:00","12:00","12:45"],"Пт":["1","08:00","15:45","12:00","12:45"],"Сб":["0",null,null,null,null],"Нд":["0",null,null,null,null]}
  }
]


function parseSchedule(scheduleJSON) {
  let answer = ''
  const keys = Object.keys(scheduleJSON)
  
  let currentDay = ''
  let previousDay = ''

  for (let i = 0; i < keys.length; i++) {
    
    previousDay = currentDay
    currentDay = ''
    
    if (scheduleJSON[keys[i]][0] == 0) {
      currentDay = `<p>${keys[i]}</p><p>Вихідний</p>`
    } else {
      currentDay += `<p>${keys[i]}</p><div><p>${scheduleJSON[keys[i]][1]} - ${scheduleJSON[keys[i]][2]}</p>`

      if (scheduleJSON[keys[i]][3] != null) currentDay += `<br><p>Перерва</p><p>${scheduleJSON[keys[i]][3]} - ${scheduleJSON[keys[i]][4]}</p>`
      currentDay += '</div>'
    }
    
    
    if (currentDay.substring(5) != previousDay.substring(5)) {
      answer += '<div class="content-entry">'+currentDay+"</div>"
    } else {
      answer = answer.replace(previousDay.substring(3,5), previousDay.substring(3,5)+', '+currentDay.substring(3,5))
    }
  }
  answer = answer.replace('Пн,Вт,Ср,Чт,Пт', 'Пн-Пт')
  answer = answer.replace('Пн', 'Понеділок')
  answer = answer.replace('Вт', 'Вівторок')
  answer = answer.replace('Ср', 'Середа')
  answer = answer.replace('Чт', 'Четвер')
  answer = answer.replace('Пт', "П'ятниця")
  answer = answer.replace('Сб', 'Субота')
  answer = answer.replace('Нд', 'Неділя')
  return answer

}

window.addEventListener('load', function () {

  for (let i = 0; i < schedule.length; i++) {
    const institution = document.getElementById(`institution-${schedule[i].id}`)
    institution.querySelector('.schedule').innerHTML = parseSchedule(schedule[i].schedule)
  }

  const elemArr = document.getElementsByClassName('schedule-accordion')
  for (let i = 0; i < elemArr.length; i++) {
    elemArr[i].querySelector('h5').addEventListener('click', function() {
      
      this.parentElement.classList.toggle('open')

    })
  }

})