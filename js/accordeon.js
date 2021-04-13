"use_strict"
window.addEventListener('load', function () {

  const elemArr = document.getElementsByClassName('accordion-menu-content')
  for (let i = 0; i < elemArr.length; i++) {
    elemArr[i].querySelector('h4').addEventListener('click', function() {
      
      this.parentElement.parentElement.classList.toggle('open')

    })
  }

})