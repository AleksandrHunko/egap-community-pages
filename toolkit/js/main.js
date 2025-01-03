"use_strict"
window.addEventListener('load', function () {
  const menuLinks = document.querySelector('.nav-menu-mobile').querySelectorAll('.nav-elem')

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', () => {
      document.getElementById('menuToggle').querySelector('input').checked = false
      document.body.style.overflowY = "auto";
    })
  }

  document.getElementById('menuToggle').querySelector('input').addEventListener('change', function () {
    if (this.checked) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  })


  const inputs = document.querySelectorAll(".stylyzed-input");
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].querySelector('input').addEventListener('change', validateInput)
    }
  }

    function validateInput(e) {
        if (e.target.value == '') {
            e.target.classList.remove('invalid')
            e.target.classList.remove('valid')
        } else if (e.target.checkValidity()) {
            e.target.classList.remove('invalid')
            e.target.classList.add('valid')
        } else {
            e.target.classList.add('invalid')
            e.target.classList.remove('valid')
        }
    }

  const closeButtons = document.querySelectorAll('.close')

    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', (thisButton) => {
            thisButton.target.parentElement.classList.remove('active')
        })
    }
})