"use_strict"

const koatuu = '0710100000'

const itemSchema = (title, link, votes, budget) => {
  let insertedDiv = document.createElement('div')
  insertedDiv.classList.add("item");
  const insertedLink = document.createElement('a')
  insertedDiv.innerHTML = `
    <a href="${link}"><h4>${title}</h4></a>
    <p>Необхідний бюджет ${budget}грн</p>
    <p>Зібрано ${votes} голосів</p>
  `
  return insertedDiv
}

window.addEventListener('load', () => {
  const url = new URL(window.location.href);

  const params = {
    query: url.searchParams.get('query'),
    tag: url.searchParams.get('tag'),
    type: url.searchParams.get('type')
  }
  let h2text = 'Бюджети за запитом '
  if (params.query != null) {
    h2text += `"${params.query}"`
  } else {
    h2text += '""'
  }


  document.querySelector('section').querySelector('h2').innerHTML = h2text

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector('.edem-container').innerHTML = ''
      const response = JSON.parse(this.responseText)

      handleResponse(response, params)
    }
  }
  xmlhttp.open("GET", `https://e-dem.ua/api/v1/local_governments/${koatuu}/budgets/competition`, true);
  xmlhttp.send();
})

function handleResponse(schedule, params) {
  for (let i = 0; i < schedule.length; i++) {
    const insertedOption = document.createElement('option')
    insertedOption.text = schedule[i].title
    insertedOption.value = schedule[i].id
    document.querySelector('#budget-options').add(insertedOption, null);
  }
  if (params.type == null) {

    const latestBudget = schedule[schedule.length-1]
    const today = new Date()
    const start_registration = new Date(latestBudget.start_register)
    const start_consider = new Date(latestBudget.start_consider)
    const start_sign = new Date(latestBudget.start_sign)
    const start_detect = new Date(latestBudget.start_detect)
    const start_realize = new Date(latestBudget.start_realize)
    const end_realize = new Date(latestBudget.end_realize)
  
    let                             currentPeriod = 'pre_registration'
    if (today > start_registration) currentPeriod = 'registration'
    if (today > start_consider)     currentPeriod = 'consider'
    if (today > start_sign)         currentPeriod = 'sign'
    if (today > start_detect)       currentPeriod = 'detect'
    if (today > start_realize)      currentPeriod = 'realize'
    if (today > end_realize)        currentPeriod = 'end_realize'
  
    if (currentPeriod == 'sign' || currentPeriod == 'detect') {
      showBudgets(`https://e-dem.ua/api/v1/local_governments/${koatuu}/budgets`, params)
    } else {
      showBudgets(`https://e-dem.ua/api/v1/local_governments/${koatuu}/budgets/competition/${latestBudget.id}`, params)
    }
  } else {
    showBudgets(`https://e-dem.ua/api/v1/local_governments/${koatuu}/budgets/competition/${params.type}`, params)
  }
}

function showBudgets(link, params) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector('.edem-container').innerHTML = ''
      let tags = new Set()
      const response = JSON.parse(this.responseText)
      const budgets = response.projects

      for (let i = 0; i < budgets.length; i++) {
        tags.add(budgets[i].category)

        let matchedTags = true
        let matchedQuery = true
        if (params.query !== null && params.query != '') {
          matchedQuery = budgets[i].title.includes(params.query)
        }
        if (params.tag !== null && budgets[i].category != params.tag) {
          matchedTags = false
        }
        if (matchedQuery && matchedTags)
        document
        .querySelector('.edem-container')
        .appendChild(
          itemSchema(
            budgets[i].title, 
            budgets[i].url_project, 
            budgets[i].votes, 
            budgets[i].budget
          )
        )
      }
      if (budgets.length == 0) {
        document
        .querySelector('.edem-container')
        .innerHTML = '<h4>Проєктів бюджету не знайдено</h4>'
      }

      const tagsArray = Array.from(tags)
      for (let i = 0; i < tagsArray.length; i++) {
        const tag = document.createElement('a')
        tag.setAttribute('href', `/e-dem/budgets/search?tag=${tagsArray[i]}`)
        tag.classList.add('news-tag')
        tag.innerHTML = tagsArray[i]
        document
        .getElementById('edem-section')
        .querySelector('.news-tags')
        .appendChild(tag)
      }
    }
  }
  xmlhttp.open("GET", link, true);
  xmlhttp.send();
}