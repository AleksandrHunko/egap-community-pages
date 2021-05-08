"use_strict"

const koatuu = '0710100000'

const itemSchema = (end_date, title, link, votes, maxVotes) => {
  let insertedDiv = document.createElement('div')
  insertedDiv.classList.add("item");
  const votesQuant = votes / maxVotes;
  if (votes == 0) {
  } else if (votesQuant < 0.5) {
    insertedDiv.classList.add("width-25");
  } else if (votesQuant < 0.75) {
    insertedDiv.classList.add("width-50");
  } else if (votesQuant < 1) {
    insertedDiv.classList.add("width-75");
  } else if (votesQuant >= 1) {
    insertedDiv.classList.add("width-100");
  }
  var daysLeft = Math.ceil(Math.abs((new Date(end_date) - new Date()) / (24 * 60 * 60 * 10 * 10 * 10)));
  const insertedLink = document.createElement('a')
  insertedDiv.innerHTML = `
    <a href="${link}"><h4>${title}</h4></a>
    <p>Зібрано ${votes} підписів з ${maxVotes}</p>
    <p>Залишилось ${daysLeft} днів</p>
  `
  return insertedDiv
}

function displayItems(response, params) {
  document.querySelector('.edem-container').innerHTML = ''
  const petitions = response.projects
  let tags = new Set()

  for (let i = 0; i < petitions.length; i++) {
    tags.add(`{"id": "${petitions[i].category}", "title": "${petitions[i].category_name_uk}"}`)

    let matchedTags = true
    let matchedQuery = true
    if (params.query !== null && params.query != '') {
      matchedQuery = petitions[i].title.includes(params.query)
    }
    if (params.tag !== null && petitions[i].category != params.tag) {
      matchedTags = false
    }
      if (matchedQuery && matchedTags)
      document
        .querySelector('.edem-container')
        .appendChild(
          itemSchema(
            petitions[i].time_end,
            petitions[i].title,
            petitions[i].link,
            petitions[i].count_signs,
            petitions[i].required_signs
          )
        )
  }
  if (petitions.length == 0) {
    document
      .querySelector('.edem-container')
      .innerHTML = '<h4>Петицій не знайдено</h4>'
  }

  const tagsArray = Array.from(tags)
  for (let i = 0; i < tagsArray.length; i++) {
    const thisTag = JSON.parse(tagsArray[i])
    const tag = document.createElement('a')
    tag.setAttribute('href', `/e-dem/petitions/search?tag=${thisTag.id}`)
    tag.classList.add('news-tag')
    tag.innerHTML = thisTag.title
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
    tag: url.searchParams.get('tag')
  }
  let h2text = 'Петиції за запитом '
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
  xmlhttp.open("GET", `https://e-dem.ua/api/v1/local_governments/${koatuu}/petition_projects?filters[status_name]=Published`, true);
  xmlhttp.send();
})