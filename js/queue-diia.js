const queue_id = document.querySelector('main').dataset.queue

const api_host = 'https://api.toolkit.in.ua/diia/v1'

let chosenDay = '00'
let ut = null

window.onload = function () {




  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('ut')) ut = urlParams.get('ut')

  setType();


  document.querySelector('#time-select').addEventListener('change', () => {
    document.querySelector('.queue-continue-registration').classList.remove('hidden')
  })

  document.querySelector('#queue-button').addEventListener('click', () => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.status == 200) {
        console.log('got here');
        
        console.log(JSON.parse(this.responseText));
        if (!JSON.parse(this.responseText).success) {
          alert('Сталася помилка при записі на цей час. Спробуйте запис на інший час')
          location.reload()
        } else {
          const code = JSON.parse(this.responseText).item.bronyid
          const fixedgroup = JSON.parse(this.responseText).item.fixedgroup

          const params = {
            queue_id: queue_id,
            code: code,
            day: chosenDay,
            time: document.querySelector('#time-select').selectedOptions[0].text,
            timeslot_id: document.querySelector('#time-select').value,
            fixedgroup: fixedgroup,
            ut:  ut || null
          };
          
          const encoded = btoa(JSON.stringify(params));
  
          let appendedLink = `/queue-register?q=${encoded}`;
          window.location.href = window.location.href = location.protocol + '//' + location.host + location.pathname + appendedLink;
        }

      } else if ( this.readyState == 4 && (this.status == 406 || this.status == 400)) {
        alert('Сталася помилка при записі на цей час. Спробуйте запис на інший час')
        location.reload()
      }
    }
    xmlhttp.open("POST", `${api_host}/timeslots/reserve-code`, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(JSON.stringify({
      timeslot_id: document.querySelector('#time-select').value,
      queue_id: queue_id
    }));
  })
}


function setType() {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200 && this.responseText.length != 0) {
      const result = JSON.parse(this.responseText).rows
      

      const typeSelect = document.querySelector('#queue-type')
      for (let i = 0; i < result.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = result[i].pdesc;
        opt.value = result[i].id;
        typeSelect.appendChild(opt);
      }
      
      document.querySelector('#queue-type').addEventListener('change', () => {
        setDays(document.querySelector('#queue-type').value)
        document.querySelector('.queue-block').classList.remove('hidden')
        document.querySelector('.queue-schedule').classList.add('hidden')
        document.querySelector('.queue-continue-registration').classList.add('hidden')
        document.querySelector('#time-select').options.selectedIndex = 0
        const activeDays = document.querySelector('.days-grid').querySelectorAll('.item.active')
        removeSelectionDays(activeDays)
      })
    }

  }
  
  
  xmlhttp.open("POST", `${api_host}/workplaces`, true);
  xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xmlhttp.send(JSON.stringify({ queue_id: queue_id }));
}

function setDays(id_p) {

  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200 && this.responseText.length != 0) {

      const result = JSON.parse(this.responseText).rows

      const today = new Date()
      let todayWeekDay = today.getDay()
      if (todayWeekDay == 0) todayWeekDay = 7
      const daysToAddBefore = todayWeekDay
      const daysToAddAfter = 7 - todayWeekDay

      // reset days grid
      document.querySelector('.queue-block').querySelector('.days-grid').innerHTML = ''
      
      // convert dates to dd.mm
      const activeDates = new Set(
        result.map(r => {
          const d = new Date(r.chdate)
          return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2)
        })
      )
      const middleDays = 14
      const totalDays = daysToAddBefore + middleDays + daysToAddAfter
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - daysToAddBefore + 1)
      
      for (let i = 0; i < totalDays; i++) {

        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)

        const formatted = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2)
        const div = document.createElement('div')
        div.classList.add('item')
        div.dataset.chdate = date.toISOString().slice(0, 10)
        div.innerHTML = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2)

        if (activeDates.has(formatted)) {
          div.classList.add('active')

          div.addEventListener('click', function () {
            removeSelectionDays(document.querySelector('.days-grid').querySelectorAll('.item.active'))
            this.classList.add('selected')
            document.querySelector('.queue-schedule').classList.remove('hidden')
            document.querySelector('.queue-schedule').querySelector('h4').innerHTML = `3. Оберіть час прийому (${this.innerHTML})`
            document.querySelector('#time-select').options.selectedIndex = 0
            setTimes(queue_id, this.dataset.chdate, id_p)
          })
        }

        document.querySelector('.queue-block .days-grid').appendChild(div)
      }

      
    }

  }
  
  
  xmlhttp.open("POST", `${api_host}/dates`, true);
  xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xmlhttp.send(JSON.stringify({ queue_id: queue_id, id_p: id_p }));
}

function removeSelectionDays(activeDays) {
  for (let i = 0; i < activeDays.length; i++) {
    activeDays[i].classList.remove('selected')
  }
}

function setTimes(queue_id, chdate, id_p) {

  chosenDay = '' + chdate.split('-')[2] + '.' + chdate.split('-')[1]

  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200 && this.responseText.length != 0) {

      const result = JSON.parse(this.responseText).rows

      let timeSelect = document.querySelector("#time-select");

      //clear old options
      for (let i = timeSelect.options.length - 1; i > 0; i--) {
        timeSelect.removeChild(timeSelect.options[i])
      }

      for (let i = 0; i < result.length; i++) {
        let opt = document.createElement('option');
        opt.value = result[i].id;
        opt.innerHTML = `${result[i].chtime.split(':')[0]}:${result[i].chtime.split(':')[1]}`;
        timeSelect.appendChild(opt)
      }

    }
  }


  xmlhttp.open("POST", `${api_host}/timeslots/list`, true);
  xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xmlhttp.send(JSON.stringify({ queue_id: queue_id, id_p: id_p, chdate: chdate }));
}


