let inputsValid = false


window.addEventListener('load', function () {
  const vulyk_form = document.getElementById("vulyk-form")
  if (vulyk_form) {
    const inputs = vulyk_form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', validateInput)
    }
  
    function validateInput(e) {
      if (e.target.checkValidity() || e.target.value == '') {
        e.target.classList.remove('invalid')
        inputsValid = true
      } else {
        e.target.classList.add('invalid')
        inputsValid = false
      }
    }
  }
})


function getVulykData() {

  if (!inputsValid) {
    return
  }
  
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector('#vulyk-results').innerHTML = ''
      const response = JSON.parse(this.response)
      if (response == null) {
        let responseText = `<h2>Результати запиту</h2><br><br><h4>Послуги не знайдено</h4>`
        document.querySelector('#vulyk-results').innerHTML = responseText
        document.getElementById('vulyk-results').scrollIntoView();
        return
      }
      let responseText = `<h2>Результати запиту</h2>`
      responseText += `
      <div class="two-one-container reverse mobile-one-top">
        <div class="two-column"><p>${response.questionType}</p></div>
        <div class="one-column"><h5>Послуга</h5></div>
      </div>
      `

      responseText += `
      <div class="two-one-container reverse mobile-one-top no-margin-top">
        <div class="two-column"><p>${response.contents}</p></div>
        <div class="one-column"><h5>Запит</h5></div>
      </div>
      `
      const regDate = new Date(response.regDate)
      const formattedRegDate = regDate.toLocaleString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });

      responseText += `
      <div class="two-one-container reverse mobile-one-top no-margin-top">
        <div class="two-column"><p>${formattedRegDate}</p></div>
        <div class="one-column"><h5>Дата подання</h5></div>
      </div>
      `

      responseText += `
      <div class="two-one-container reverse mobile-one-top no-margin-top">
        <div class="two-column"><p>${response.answers_0.answerState}</p></div>
        <div class="one-column"><h5>Статус послуги</h5></div>
      </div>
      `

      const modified = new Date(response.answers_0.modified)
      const formattedModified = modified.toLocaleString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });

      responseText += `
      <div class="two-one-container reverse mobile-one-top no-margin-top">
        <div class="two-column"><p>${formattedModified}</p></div>
        <div class="one-column"><h5>Дата останнього оновлення статусу</h5></div>
      </div>
      `
      document.querySelector('#vulyk-results').innerHTML = responseText
      document.getElementById('vulyk-results').scrollIntoView();
    }
  }
  xmlhttp.open("POST", `https://toolkit.in.ua/queue-api/getVulykData`, true);
  xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xmlhttp.send(JSON.stringify({
      number: document.getElementsByName("number")[0].value,
      password: document.getElementsByName("pin")[0].value
  }));
}