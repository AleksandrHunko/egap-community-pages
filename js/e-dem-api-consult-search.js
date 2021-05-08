"use_strict"

const koatuu = '0710100000'


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

function displayItems(response, params) {
  document.querySelector('.edem-container').innerHTML = ''
  let tags = new Set()
  const consultations = response.consultations

  if (params.type === null || params.type === undefined || params.type === "consultations") {
    for (let i = 0; i < consultations.length; i++) {
      for (let j = 0; j < consultations[i].tags.length; j++) {
        tags.add(consultations[i].tags[j])
      }

      let matchedTags = []
      let matchedQuery = true
      if (params.query !== null && params.query != '') {
        matchedQuery = consultations[i].title.includes(params.query)
      }
      if (params.tag !== null) {
        matchedTags = consultations[i].tags.filter(tag => tag.id == params.tag);
      }
      if (matchedQuery && (params.tag == null || matchedTags.length > 0))
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
  }

  if (params.type === null || params.type === undefined || params.type === "polls") {
    const polls = response.polls
    for (let i = 0; i < polls.length; i++) {
      for (let j = 0; j < polls[i].tags.length; j++) {
        tags.add(polls[i].tags[j])
      }
      let matchedTags = []
      let matchedQuery = true
      if (params.query !== null && params.query != '') {
        matchedQuery = polls[i].title.includes(params.query)
      }
      if (params.tag !== null) {
        matchedTags = polls[i].tags.filter(tag => tag.id == params.tag);
      }
      if (matchedQuery && (params.tag == null || matchedTags.length > 0)) 
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
  }


  if (params.type === null || params.type === undefined || params.type === "npas") {
    const npas = response.npas
    for (let i = 0; i < npas.length; i++) {
      for (let j = 0; j < npas[i].tags.length; j++) {
        tags.add(npas[i].tags[j])
      }

      let matchedTags = []
      let matchedQuery = true
      if (params.query !== null && params.query != '') {
        matchedQuery = npas[i].title.includes(params.query)
      }
      if (params.tag !== null) {
        matchedTags = npas[i].tags.filter(tag => tag.id == params.tag);
      }
      if (matchedQuery && (params.tag == null || matchedTags.length > 0)) 
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
  }

  if (document.querySelector('.edem-container').childElementCount == 0) {
    document
      .querySelector('.edem-container')
      .innerHTML ='<h4>Консультацій не знайдено</h4>'
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

window.addEventListener('load', () => {

  const url = new URL(window.location.href);

  const params = {
    query: url.searchParams.get('query'),
    tag: url.searchParams.get('tag'),
    type: url.searchParams.get('type')
  }
  let h2text = 'Консультації за запитом '
  if (params.query != null) {
    h2text += `"${params.query}"`
  } else {
    h2text += '""'
  }


  document.querySelector('section').querySelector('h2').innerHTML = h2text

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText)

      displayItems(response, params)
    }
  }
  xmlhttp.open("GET", `https://e-dem.ua/api/v1/local_governments/${koatuu}/consultations?filters[status]=active`, true);
  xmlhttp.send();
})