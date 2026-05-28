comics = {
  'hi':3,
  'Cartoon people':2,
}
for(var i in comics) {
  var h1r = document.createElement('h1')
  h1r.innerText = i
  h1r.style.textAlign = 'left'
  document.body.appendChild(h1r)
  for(var ij= 1; ij <= comics[i]; ij++) {
    var img = document.createElement('img')
    img.src = `/comics/${i}/panel${ij}.png`
    img.className = "panel"
    document.body.appendChild(img)
  }
  document.body.appendChild(document.createElement('br'))
}