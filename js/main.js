"use_strict"
window.addEventListener('load', function () {
  try {
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
  } catch(err) {
    console.log('mobile menu not found');
  }

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

  try {
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
  } catch(err) {
    console.log('accessibility menu not found');
  }

  const closeButtons = document.querySelectorAll('.close')

    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', (thisButton) => {
            thisButton.target.parentElement.classList.remove('active')
        })
    }
    try {
      const searchIcon = document.querySelector('.search-icon')
      searchIcon.addEventListener('click', (thisIcon) => {
        thisIcon.target.parentElement.parentElement.querySelector('.search-window').classList.add('active')
      })
    } catch(err) {
      console.log('searchIcon not found');
    }

    try {
      const scrollTopButton = document.querySelector('#scroll-top')
  
      window.onscroll = function () { 
        if (window.scrollY > 1200) {
          scrollTopButton.classList.add('show');
        } else {
          scrollTopButton.classList.remove('show');
        }
      };
    } catch (err) {
      console.log('scrollTopButton not found');
    } 
})