const api_host = 'https://api.toolkit.in.ua/diia/v1'

window.onload = function () {
  const q = new URLSearchParams(window.location.search).get('q');
  const data = JSON.parse(atob(q));

  const queue_id = data.queue_id
  const fixedgroup = data.fixedgroup
  document.querySelector('.queue-content').querySelector('.day').innerHTML = `<h4>День: ${data.day}</h4>`
  document.querySelector('.queue-content').querySelector('.time').innerHTML = `<h4>Час: ${data.time}</h4>`


  getFixedGroup(queue_id, fixedgroup)

  document.querySelector('#fixedgroup').addEventListener('change', () => {
    getService(queue_id, document.querySelector('#fixedgroup').value)
  })


  document.querySelector('.queue-data-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const form = document.querySelector('.queue-data-form')
    const inputs = form.querySelectorAll('input')

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        valid = false;
        inputs[i].classList.add('invalid')
      }
    }
    if (valid) {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const code = JSON.parse(this.responseText).code

          let appendedLink = `/success?code=${code}`
          if (data.ut) appendedLink += `&ut=${data.ut}`

          window.location.href = location.protocol + '//' + location.host + location.pathname + appendedLink
        } else if (this.readyState == 4 && (this.status == 406 || this.status == 400)) {
          alert('Сталася помилка при записі на цей час. Спробуйте запис на інший час')
          // Go back one level
          window.location.pathname = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
        }
      }
      xmlhttp.open("POST", `${api_host}/timeslots/submit`, true);
      xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
      xmlhttp.send(JSON.stringify({
        bronyid: data.code,
        fname: document.querySelector("input[name='fname']").value,
        phonenum: document.querySelector("input[name='phonenum']").value,
        queue_id: queue_id,
        timeslot_id: data.timeslot_id,
        id_q: document.querySelector('#service-id').value
      }));
    }
  })
}


function getFixedGroup(queue_id, fixedgroup) {
  

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      
      const options = JSON.parse(this.responseText).rows


      const fixedgroupSelect = document.querySelector('#fixedgroup')
      for (let i = 0; i < options.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = options[i].sector;
        opt.value = options[i].id;
        fixedgroupSelect.appendChild(opt);
      }
    }
  }
    xmlhttp.open("POST", `${api_host}/fixedgroup`, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(JSON.stringify({
      queue_id: queue_id,
      fixedgroup: fixedgroup
    }));


}


function getService(queue_id, sector_id) {
  

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {


    if (this.readyState == 4 && this.status == 200) {
      
      const options = JSON.parse(this.responseText).rows


      const serviceSelect = document.querySelector('#service-id')

      serviceSelect.innerHTML = ''
      serviceSelect.classList.remove('hidden')
      for (let i = 0; i < options.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = options[i].qname;
        opt.value = options[i].id;
        serviceSelect.appendChild(opt);
      }
    }
  }
    xmlhttp.open("POST", `${api_host}/services/list`, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(JSON.stringify({
      queue_id: queue_id,
      id_q: sector_id
    }));

}