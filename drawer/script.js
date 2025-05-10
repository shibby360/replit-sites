var down
var eraser
var drawing
var recting
var ovaling
var typing
var txt
var rectx = false
var recty = false
var tyx = false
var tyy = false
var color = 'black'
var bgcolor = 'transparent'
var selected
var svg = document.getElementsByTagName('svg')[0]
function outsideClick(event, notelem)	{
  notelem = $(notelem);
  var clickedOut = true, i, len = notelem.length;
  for (i = 0;i < len;i++)  {
    if (event.target == notelem[i] || notelem[i].contains(event.target)) {
      clickedOut = false;
    }
  }
  return clickedOut
}
function createSVGElement(svg, element, properties, style) {
  var attrs = ""
  for(var i in properties) {
    attrs += i + '="' + properties[i] + '" '
  }
  var styles = ""
  for(var i in style) {
    styles += i+":"+style[i]+";"
  }
  svg.insertAdjacentHTML("beforeEnd", "<"+element+" "+attrs+"style='"+styles+"'></"+element+">")
  return svg.lastChild
}
function moveSVGElement(el, x, y) {
  if(el.x && el.y) {
    el.setAttribute('x', x)
    el.setAttribute('y', y)
  }
  else if(el.cx && el.cy) {
    el.setAttribute('cx', x+el.width.baseVal.value/2)
    el.setAttribute('cy', y+el.height.baseVal.value/2)
  }
}
function onclickfunc() {
  selected = this
  drawing = false
  recting = false
  eraser = false
  ovaling = false
  typing = false
  this.classList += "selected"
}
function muf() {}
$("#canvas").mousedown(() => down = true)
$("#canvas").mouseup(() => {
  down = false
  muf()
  muf = function() {}
})
var oldx = 0
var oldy = 0
$("#canvas").mousemove((evt) => {
  if(down) {
    if(selected) {
      moveSVGElement(selected, evt.pageX, evt.pageY)
      return
    }
    if(drawing) {
      createSVGElement(svg, 'circle', {cx:evt.pageX, cy:evt.pageY, r:5}, {stroke:'black', fill:'black'})
    }
    if(recting) {
      $('#prevrect').remove()
      if(rectx === false) {
        rectx = evt.pageX
      }
      if(recty === false) {
        recty = evt.pageY
      }
      var currEl = createSVGElement(svg, 'rect', {'x':Math.min(evt.pageX, rectx), 'y':Math.min(evt.pageY, recty), 'width':Math.abs(evt.pageX-rectx), 'height':Math.abs(evt.pageY-recty), id:'prevrect'}, {'fill':bgcolor, 'stroke':color})
      currEl.onclick = onclickfunc
      if(ovaling) {
        currEl.setAttribute('rx', '50%')
        currEl.setAttribute('ry', '50%')
      }
      muf = function() {
        rectx = false
        recty = false
        $('#prevrect').removeAttr('id')
      }
    }
  }
})
$("#canvas").click((evt) => {
  if(typing) {
  }
})
$(window).keydown((evt) => {
  if(typing) {
  }
  if(selected) {
    if(evt.key === 'Backspace') {
      selected.remove()
      selected = null
    }
  }
  if(evt.key === 'l') {
    drawing = drawing ? false : true
    recting = false
    eraser = false
    ovaling = false
    typing = false
  }
  if(evt.key === 'r') {
    recting = recting ? false : true
    drawing = false
    eraser = false
    ovaling = false
    typing = false
  }
  if(evt.key === 'c') {
    color = prompt('Enter hex(or word): ', color)
  }
  if(evt.key === 'o') {
    ovaling = ovaling ? false : true
    drawing = false
    eraser = false
    typing = false
    recting = ovaling
  }
  if(evt.key === 't') {
    typing = true
    ovaling = false
    drawing = false
    eraser = false
  }
  if(evt.key === 'g') {
    bgcolor = prompt('Enter hex(or word) for background color of shapes: ', bgcolor)
  }
  if(evt.key === 's') {
    html2canvas($(document.body)[0]).then((canvas) => {
      var flnm = prompt('Name of the file(Will be saved as png)?: ')
      $(`<a href="${canvas.toDataURL()}" download="${flnm}.png"></a>`)[0].click()
    })
  }
})
function clickedoutsidebody(evt) {
  if(outsideClick(evt, 'svg > *')) {
    $(selected).removeClass('selected')
    selected = null
  }
}
$(document.body).click(clickedoutsidebody)