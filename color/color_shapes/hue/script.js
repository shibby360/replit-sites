function draw() {
  var p1 = document.getElementById('p1').value
  var p2 = document.getElementById('p2').value
  var mode = document.getElementById('mode').value
  var cols = []
  for(var i = 0; i <= 360; i+=15) {
    color = mode + '(' + i + ' ' + p1 + '% ' + p2 + '%)'
    console.log(color)
    cols.push(color)
  }
  document.getElementById('circle').style.background = `conic-gradient(${cols+[]})`
}
draw()
Array.from(document.getElementsByTagName('input')).forEach((el) => {
  el.addEventListener('input', draw)
})
document.getElementById('mode').addEventListener('change', draw)