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
      inputs[i].querySelector('input').addEventListener('change', function() {
        if (this.value == "") {
          this.classList.remove('valid')
        } else {
          this.classList.add('valid')
        }
      })
    }
  }

  if (document.cookie.split('; ').find(row => row.startsWith('enable-contrast'))) {
    document.querySelector('body').classList.toggle('contrast-enable')
    document.querySelector('.accessibility').querySelector('p').innerHTML = 'Стандартна версія'
  } 

  document.querySelector('.accessibility').addEventListener('click', () => {
    document.querySelector('body').classList.toggle('contrast-enable')
    if(document.querySelector('body').classList.contains('contrast-enable')) {
      document.querySelector('.accessibility').querySelector('p').innerHTML = 'Стандартна версія'
      document.cookie = "enable-contrast=true; path=/;";
    } else {
      document.querySelector('.accessibility').querySelector('p').innerHTML = 'Людям із порушенням зору'
      document.cookie = "enable-contrast=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  })

  const closeButtons = document.querySelectorAll('.close')

    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', (thisButton) => {
            thisButton.target.parentElement.classList.remove('active')
        })
    }

    const searchIcon = document.querySelector('.search-icon')
    searchIcon.addEventListener('click', (thisIcon) => {
      thisIcon.target.parentElement.parentElement.querySelector('.search-window').classList.add('active')
    })
})