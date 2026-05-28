var c = document.getElementById('cc')
var draw = document.getElementById('draw')
var ctx = c.getContext('2d')
var count = 0
var mix = function(color_1, color_2, weight) {
  function d2h(d) { return d.toString(16) }
  function h2d(h) { return parseInt(h, 16) }
  weight = (typeof(weight) !== 'undefined') ? weight : 50

  var color = "#"

  for(var i = 0; i <= 5; i += 2) {
    var v1 = h2d(color_1.substr(i, 2)),
        v2 = h2d(color_2.substr(i, 2)),
        val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0))) 

    while(val.length < 2) { val = '0' + val }
    
    color += val
  }
    
  return color
}
var rgb2hex = function(rgb) {
  rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\)$/)
  function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2) }
  return (hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])).toUpperCase()
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}
var img1 = document.createElement('img')
img1.src = 'assets/sohan.jpg'
var img2 = document.createElement('img')
img2.src = 'assets/shaq.png'
img1.onload = () => {
  ctx.drawImage(img1, 0, 0, c.width, c.height)
  window.data = ctx.getImageData(0, 0, c.width, c.height).data
  ctx.clearRect(0, 0, c.width, c.height)
}
img2.onload = () => {
  ctx.drawImage(img2, 0, 0, c.width, c.height)
  window.data2 = ctx.getImageData(0, 0, c.width, c.height).data
  ctx.clearRect(0, 0, c.width, c.height)
}
img1.addEventListener('load', loaded)
img2.addEventListener('load', loaded)
function loaded() {
  count ++
  if(count !== 2) {
    return
  }
  var newdata = []
  for(var i = 0; i < data.length; i += 4) {
    // newdata[i] = (data[i] + data2[i])/2
    // newdata[i+1] = (data[i+1] + data2[i+1])/2
    // newdata[i+2] = (data[i+2] + data2[i+2])/2
    newdata[i+3] = data[i+3] + data2[i+3]
    var data1str = `rgb(${data[i]}, ${data[i+1]}, ${data[i+2]})`
    var data2str = `rgb(${data2[i]}, ${data2[i+1]}, ${data2[i+2]})`
    var mixed = mix(rgb2hex(data1str), rgb2hex(data2str))
    mixed = [hexToRgb(mixed).r, hexToRgb(mixed).g, hexToRgb(mixed).b]
    newdata[i] = mixed[0]
    newdata[i+1] = mixed[1]
    newdata[i+2] = mixed[2]
  }
  var imgdata = new ImageData(c.width, c.height)
  imgdata.data.set(newdata)
  draw.getContext('2d').putImageData(imgdata, 0, 0)
}