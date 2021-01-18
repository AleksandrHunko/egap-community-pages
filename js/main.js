"use_strict"

window.onload = function () {
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
}