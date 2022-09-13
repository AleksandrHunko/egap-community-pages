"use_strict"

const koatuu = '5324085900'

const itemSchema = (title, link, votes, budget) => {
  let insertedDiv = document.createElement('div')
  insertedDiv.classList.add("item");
  const insertedLink = document.createElement('a')
  insertedDiv.innerHTML = `
    <a href="${link}" target="_blank"><h4>${title}</h4></a>
    <p>Необхідний бюджет ${budget}грн</p>
    <p>Зібрано ${votes} голосів</p>
  `
  return insertedDiv
}

window.addEventListener('load', () => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector('.edem-container').innerHTML = ''
      const response = JSON.parse(this.responseText)
      handleResponse(response)
    }
  }
  xmlhttp.open("GET", `https://e-dem.ua/api/v1/local_governments/${koatuu}/budgets/competition`, true);
  xmlhttp.send();
})

function handleResponse(schedule) {
  for (let i = 0; i < schedule.length; i++) {
    const insertedOption = document.createElement('option')
    insertedOption.text = schedule[i].title
    insertedOption.value = schedule[i].id
    document.querySelector('#budget-options').add(insertedOption, null);
  }
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
    showBudgets(`https://e-dem.ua/api/v1/local_governments/${koatuu}/budgets`)
  } else {
    showBudgets(`https://e-dem.ua/api/v1/local_governments/${koatuu}/budgets/competition/${latestBudget.id}`)
    document.querySelector('.edem-live').querySelector('svg').remove()
    document.querySelector('.edem-live').querySelector('h4').innerHTML = 'Бюджети на реалізації'
  }
}

function showBudgets(link) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector('.edem-container').innerHTML = ''
      let tags = new Set()
      const response = JSON.parse(this.responseText)
      const budgets = response.projects

      for (let i = 0; i < Math.min(budgets.length, 8); i++) {
        tags.add(budgets[i].category)
        document
        .querySelector('.edem-container')
        .appendChild(
          itemSchema(
            budgets[i].title, 
            budgets[i].url_project || budgets[i].link, 
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