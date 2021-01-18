"use_strict"

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
}