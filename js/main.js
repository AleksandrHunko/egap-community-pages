"use_strict"

window.onload = function() {
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

  window.onscroll = function () { 
    
    if (document.documentElement.scrollTop < document.querySelector('.news-block').offsetTop) {
      document.querySelector('.search-block').classList.remove('fixed')
      document.querySelector('.news').classList.remove('align-bottom')
    } else if (
        document.documentElement.scrollTop > (document.querySelector('.news-block').offsetTop - 10) &&
        document.documentElement.scrollTop < (document.querySelector('.news-block').offsetTop + document.querySelector('.news-block').offsetHeight - 656)
      ) {
      document.querySelector('.search-block').classList.add('fixed')
    } else {
      document.querySelector('.search-block').classList.remove('fixed')
      document.querySelector('.news').classList.add('align-bottom')
    }
  };
}