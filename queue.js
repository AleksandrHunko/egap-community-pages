
const institution_id = document.querySelector('#queue').dataset.institution

let chosenDay = '00'

window.onload = function () {


  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200 && this.responseText.length != 0) {
      const result = JSON.parse(this.responseText).body

      const typeSelect = document.querySelector('#queue-type')
      for (let i = 0; i < result.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = result[i].description;
        opt.value = result[i].queue_instance_id;
        typeSelect.appendChild(opt);
      }

      document.querySelector('#queue-type').addEventListener('change', () => {
        setDays(result, document.querySelector('#queue-type').value)
        document.querySelector('.queue-block').classList.remove('hidden')
        document.querySelector('.queue-schedule').classList.add('hidden')
        document.querySelector('.queue-continue-registration').classList.add('hidden')
        document.querySelector('#time-select').options.selectedIndex = 0
        const activeDays = document.querySelector('.days-grid').querySelectorAll('.item.active')
        removeSelectionDays(activeDays)
      })

    }
  }

  xmlhttp.open("GET", `https://toolkit.in.ua/queue-api/generate-slots/${institution_id}`, true);
  xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xmlhttp.send()

  function setDays(data, queue_instance_id) {
    const today = new Date()
    let todayWeekDay = today.getDay()
    if (todayWeekDay == 0) todayWeekDay = 7
    const daysToAddBefore = todayWeekDay
    const daysToAddAfter = 7 - todayWeekDay

    document.querySelector('.queue-block').querySelector('.days-grid').innerHTML = ''
    for (let i = 1; i <= daysToAddBefore; i++) {
      let insertedDiv = document.createElement('div')
      insertedDiv.classList.add("item");
      let date = new Date()
      date.setDate(date.getDate() - daysToAddBefore + i);
      insertedDiv.innerHTML = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}`
      document.querySelector('.queue-block').querySelector('.days-grid').appendChild(insertedDiv)
    }
    const days = data.filter(function (element) { return element.queue_instance_id == queue_instance_id })[0].days
    for (let i = 0; i < days.length; i++) {

      let insertedDiv = document.createElement('div')
      insertedDiv.classList.add("item");
      if (days[i].active == 1 && hasSlots(days[i].slots)) {
        insertedDiv.classList.add("active");
      } else if (days[i].active == 1) {
        insertedDiv.classList.add("full");
      }
      insertedDiv.innerHTML = days[i].dayForFrontend
      insertedDiv.dataset.day = days[i].day
      document.querySelector('.queue-block').querySelector('.days-grid').appendChild(insertedDiv)
    }

    for (let i = 0; i < daysToAddAfter; i++) {
      let insertedDiv = document.createElement('div')
      insertedDiv.classList.add("item");
      let date = new Date()
      date.setDate(date.getDate() + 15 + i);
      insertedDiv.innerHTML = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}`
      document.querySelector('.queue-block').querySelector('.days-grid').appendChild(insertedDiv)
    }

    const activeDays = document.querySelector('.days-grid').querySelectorAll('.item.active')

    for (let i = 0; i < activeDays.length; i++) {
      activeDays[i].addEventListener('click', function () {
        removeSelectionDays(activeDays)
        this.classList.add('selected')
        document.querySelector('.queue-schedule').classList.remove('hidden')
        document.querySelector('.queue-schedule').querySelector('h4').innerHTML = `3. Оберіть час прийому (${this.innerHTML})`
        document.querySelector('#time-select').options.selectedIndex = 0
        chosenDay = this.dataset.day
        setTimes(data, chosenDay, queue_instance_id)
      })
    }
  }

  function removeSelectionDays(activeDays) {
    for (let i = 0; i < activeDays.length; i++) {
      activeDays[i].classList.remove('selected')
    }
  }

  function setTimes(data, day, queue_instance_id) {
    const days = data.filter(function (element) { return element.queue_instance_id == queue_instance_id })[0].days
    const slots = days.filter(function (element) { return element.day == day })[0].slots
    let timeSelect = document.querySelector("#time-select");

    //clear old options
    for (let i = timeSelect.options.length - 1; i > 0; i--) {
      timeSelect.removeChild(timeSelect.options[i])
    }
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].amount > 0) {
        let opt = document.createElement('option');
        opt.value = slots[i].time;
        opt.innerHTML = slots[i].time;
        timeSelect.appendChild(opt)
      }
    }
  }

  function hasSlots(slots) {
    let has_slots = false
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].amount != 0) has_slots = true
    }
    return has_slots
  }


  document.querySelector('#time-select').addEventListener('change', () => {
    document.querySelector('.queue-continue-registration').classList.remove('hidden')
  })

  document.querySelector('#queue-button').addEventListener('click', () => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.status == 200) {
        const code = JSON.parse(this.responseText).code
        window.location.href += `/queue-register?code=${code}&day=${chosenDay}&time=${document.querySelector("#time-select").value}`;
      } else if ( this.readyState == 4 && (this.status == 406 || this.status == 400)) {
        alert('Сталася помилка при записі на цей час. Спробуйте запис на інший час')
        location.reload()
      }
    }
    xmlhttp.open("POST", "https://toolkit.in.ua/queue-api/freeze-slot", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(JSON.stringify({
      day: chosenDay,
      time: document.querySelector("#time-select").value,
      queue_instance_id: document.querySelector("#queue-type").value
    }));
  })
}
