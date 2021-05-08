"use_strict"

const koatuu = '4610100000'


const itemSchema = function (end_date, title, link, veiws) {

  let insertedDiv = document.createElement('div')
  insertedDiv.classList.add("item");
  var daysLeft = Math.ceil(Math.abs((new Date(end_date) - new Date()) / (24 * 60 * 60 * 10 * 10 * 10)));
  insertedDiv.innerHTML = `
    <a href="${link}">
      <h4>${title}</h4>
    </a>
    <p>${veiws} переглядів</p>
    <p>Залишилось ${daysLeft} днів</p>`
  return insertedDiv
}

window.addEventListener('load', () => {

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //alert(JSON.stringify(this.responseText))
      document.querySelector('.edem-container').innerHTML = ''
      const response = JSON.parse(this.responseText)

      let tags = new Set()
      const consultations = response.consultations
      
      for (let i = 0; i < Math.min(consultations.length, 4); i++) {
        for (let j = 0; j < consultations[i].tags.length; j++) {
          tags.add(consultations[i].tags[j])
        }
        document
        .querySelector('.edem-container')
        .appendChild(
          itemSchema(
            consultations[i].end_date, 
            consultations[i].title, 
            consultations[i].link, 
            consultations[i].views_count
          )
        )
      }
      const polls = response.polls
      for (let i = 0; i < Math.min(polls.length, 4); i++) {
        for (let j = 0; j < polls[i].tags.length; j++) {
          tags.add(polls[i].tags[j])
        }
        document
        .querySelector('.edem-container')
        .appendChild(
          itemSchema(
            polls[i].end_date, 
            polls[i].title, 
            polls[i].link, 
            polls[i].views_count
          )
        )
      }
      const npas = response.npas
      for (let i = 0; i < Math.min(npas.length, 4); i++) {
        for (let j = 0; j < npas[i].tags.length; j++) {
          tags.add(npas[i].tags[j])
        }
        document
        .querySelector('.edem-container')
        .appendChild(
          itemSchema(
            npas[i].end_date, 
            npas[i].title, 
            npas[i].link, 
            npas[i].views_count
          )
        )
      }

      if (npas.length == 0 && consultations.length == 0 && polls.length == 0) {
        document
        .querySelector('.edem-container')
        .appendChild('<h4>Консультацій не знайдено</h4>')
      }

      const tagsArray = Array.from(tags)
      for (let i = 0; i < tagsArray.length; i++) {
        const tag = document.createElement('a')
        tag.setAttribute('href', `/e-dem/consultations/search?tag=${tagsArray[i].id}`)
        tag.classList.add('news-tag')
        tag.innerHTML = tagsArray[i].title
        document
        .getElementById('edem-section')
        .querySelector('.news-tags')
        .appendChild(tag)
      }
    }
  }
  document
  .getElementById('edem-section')
  .querySelector('a')
  .setAttribute('href', `https://consult.e-dem.ua/${koatuu}`);
  xmlhttp.open("GET", `https://e-dem.ua/api/v1/local_governments/${koatuu}/consultations?filters[status]=active`, true);
  xmlhttp.send();
})