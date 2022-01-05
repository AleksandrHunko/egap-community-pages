

window.onload = function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  document.querySelector('.queue-content').querySelector('.day').innerHTML = `<h4>День: ${urlParams.get('day')}</h4>`
  document.querySelector('.queue-content').querySelector('.time').innerHTML = `<h4>Час: ${urlParams.get('time')}</h4>`

  document.querySelector('#queue-button').addEventListener('click', () => {
    
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.status == 200) {
        const code = JSON.parse(this.responseText).code
        window.location.href = `/queue-api/queue-register/success?code=${code}`;
      }
    }
    xmlhttp.open("POST", "/queue-api/generate-code", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xmlhttp.send(JSON.stringify({
      code: urlParams.get('code'),
      name: document.querySelector("input[name='name']").value,
      tel: document.querySelector("input[name='tel']").value,
      email: document.querySelector("input[name='email']").value,
    }));
  })
}