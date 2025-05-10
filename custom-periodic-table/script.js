var info = document.querySelector('#infomenu')
var tds = Array.from(document.querySelectorAll('td'))
tds.forEach(function(el) {
  el.addEventListener('click', function(ev) {
    if(info.style.display === 'block') {
      
      info.style.display = 'none'
      return
    }
    var eltouse = ev.target
    if(ev.target.nodeName !== 'TD') {
      eltouse = ev.target.parentElement
    }
    info.innerHTML = ''
    var atomimg = eltouse.getElementsByTagName('img')[0].cloneNode()
    var information = eltouse.getElementsByClassName('elementinfo')[0].cloneNode(true)
    atomimg.className = ''
    information.className = ''
    info.appendChild(atomimg)
    info.appendChild(information)
    info.style.display = 'block'
  })
})

class periodicElement extends HTMLElement {
  
}