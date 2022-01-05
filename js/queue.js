const holidays = '03.01,07.01'



function isWorkday(day, holidays) {
  if (day.getDay() != 6 && day.getDay() != 0 && day.getDate() != 7 && day.getDate() != 3) {
    return true
  } else {
    return false
  }

}

window.onload = function () {

  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {}

  xmlhttp.open("GET", "/queue-api/generate-slots/739", true);
  xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xmlhttp.send()
  

  const today = new Date()

  let todayWeekDay = today.getDay()
  if (todayWeekDay == 0) todayWeekDay = 7

  const daysToAddBefore = todayWeekDay
  const daysToAddAfter = 7 - todayWeekDay

  for (let i = 0; i < daysToAddBefore; i++) {
    let insertedDiv = document.createElement('div')
    insertedDiv.classList.add("item");
    let date = new Date()
    date.setDate(date.getDate() - daysToAddBefore + i);
    insertedDiv.innerHTML = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth()+1)).slice(-2)}`
    document.querySelector('.queue-block').querySelector('.days-grid').appendChild(insertedDiv)
  }

  for (let i = 1; i <= 14; i++) {
    let insertedDiv = document.createElement('div')
    insertedDiv.classList.add("item");
    let date = new Date()
    date.setDate(date.getDate() + i);
    if (isWorkday(date)) insertedDiv.classList.add("active");
    insertedDiv.innerHTML = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth()+1)).slice(-2)}`
    document.querySelector('.queue-block').querySelector('.days-grid').appendChild(insertedDiv)
  }

  for (let i = 0; i < daysToAddAfter; i++) {
    let insertedDiv = document.createElement('div')
    insertedDiv.classList.add("item");
    let date = new Date()
    date.setDate(date.getDate() + 14 + i);
    insertedDiv.innerHTML = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth()+1)).slice(-2)}`
    document.querySelector('.queue-block').querySelector('.days-grid').appendChild(insertedDiv)
  }


  document.querySelector('#queue-type').addEventListener('change', () => {
    document.querySelector('.queue-block').classList.remove('hidden')
  })

  const activeDays = document.querySelector('.days-grid').querySelectorAll('.item.active')

  let chosenDay = '00'

  for (let i = 0; i < activeDays.length; i++) {
    activeDays[i].addEventListener('click', function() {
      document.querySelector('.queue-schedule').classList.remove('hidden')
      document.querySelector('.queue-schedule').querySelector('h4').innerHTML = `3. Оберіть час прийому (${this.innerHTML})`
      chosenDay = this.innerHTML
    })
  }


  document.querySelector('#time-select').addEventListener('change', () => {
    document.querySelector('.queue-continue-registration').classList.remove('hidden')
  })

  document.querySelector('#queue-button').addEventListener('click', () => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.status == 200) {
        const code = JSON.parse(this.responseText).code
        window.location.href = `/queue-api/queue-register?code=${code}&day=${chosenDay}&time=${document.querySelector("#time-select").value}`;
      }
    }
    xmlhttp.open("POST", "/queue-api/freeze-slot", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(JSON.stringify({
      day: chosenDay,
      time: document.querySelector("#time-select").value
    }));
  })
}
