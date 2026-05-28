//¯
if(navigator.userAgent.indexOf("Win") != -1 || navigator.userAgent.indexOf("Mac") != -1) {
  document.getElementsByClassName('windowers')[0].style.display = 'none'
}
var body = document.getElementById('body')
var Abme = document.getElementById('Abme')
var khan = document.getElementById('khan')
var repl = document.getElementById('repl')
var conme = document.getElementById('conme')
var testbg = document.getElementById('test').style.backgroundColor
var fav = document.getElementById('link')
var cols = ['red', 'orange', 'green', 'blue', 'pink', 'violet', 'brown', 'aqua', 'white', 'black', 'yellow', 'purple']
var ascii = {
  'a':'/¯\\\n|¯|',
  'b':'|¯/ \n|¯/ \n¯',
  'c':'|¯ \n|_',
  'd':'|¯\\ \n|_/',
  'e':'|¯ \n|¯ \n ¯ ',
  'f':'|¯ \n|¯ ',
  'g':'|¯  \n| | \n ¯  ',
  'h':'| | \n|¯| ',
  'i':'| \n| ',
  'j':' ¯|¯ \n|_|  ',
  'k':'|/  \n|¯\\ ',
  'l':'|  \n|_ ',
  'm':'|\\/| \n|  | ',
  'n':'|\\| \n| | ',
  'o':'|¯| \n|_| ',
  'p':'|¯| \n|¯  ',
  'q':'|¯|\n|_|¯|',
  'r':'|¯| \n|¯\\',
  's':'|¯  \n ¯| \n¯  ',
  't':'¯|¯ \n  |  ',
  'u':'| | \n |_|',
  'v':'\\  / \n \\/',
  'w':'\\  /\\  / \n  \\/\\/',
  'x':'\\/\n /\\',
  'y':'\\/ \n |',
  'z':'¯/ \n/_ '
}
/*Keyboard shortcuts
function keyboard(event) {
  var key = event.key
  if(event.ctrlKey && event.altKey && key === 'a') {
	  window.location = 'about_me.html'
  } else if(event.ctrlKey && event.altKey && key === 'r') {
    window.location = 'https://repl.it/@ShivankChhaya'
  } else if(event.ctrlKey && event.altKey && key === 'k') {
    window.location = 'https://www.khanacademy.org/profile/paperairplane12200978NINE/projects'
  } else if(event.ctrlKey && event.altKey && key === 'c') {
    window.location = 'contact_me.html'
  } else if(event.ctrlKey && event.altKey && key === 'h') {
    window.location = 'https://repl.it/@ShivankChhaya/ShivC'
  }
}*/

/*Copy-paste
function() {
  var selected = getSelectionText()
  if (selected.length > 0) {
    var copysuccess = copySelectionText()
}
function copySelectionText() {
  var copysuccess // var to check whether execCommand successfully executed
  try {
    copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
  } catch(e) {
    copysuccess = false
  }
  return copysuccess
}*/
document.onclick = hideMenu; 
document.oncontextmenu = rightClick; 
  
function hideMenu() { 
  document.getElementById("contextMenu").style.display = "none"
}
function rightClick(e) { 
  e.preventDefault()
  if (document.getElementById("contextMenu").style.display == "block") {
    hideMenu(); 
  } else { 
    var menu = document.getElementById("contextMenu") 
    menu.style.display = 'block'; 
    menu.style.left = e.pageX + "px"; 
    menu.style.top = e.pageY + "px"; 
  }
}
function remove(str, what) {
  return str.replace(what, '')
}
function unrespond() {
  while(true) {
    console.log('hi')
  }
}
var print = function() {
  var test = document.getElementById('test').value
  if(test === 'link') {
    body.innerHTML = '<input id=\'linker\' placeholder=\'Type a link here....\'>\n<button id=\'clsa\' onclick=\'fileswitch()\'>Click to save!</button>\n<a id=\'linksto\' href=\'\'>Click me to go to the link!</a>'
  } 
  else if(test === 'html') {
    body.innerHTML = "<textarea id='htmlify' placeholder='Type some HTML here...'></textarea>\n<button onclick='run()'>Run</button>"
    document.getElementById('htmlify').style.width = '200px'
    document.getElementById('htmlify').style.height = '100px'
  } 
  else if(test === 'test') {
    body.innerHTML = '<p>How many states are there in the US?</p><input id=\'fst\' placeholder=\'Type answer here...\'>\n<p>Are there three primary colors for light(Yes or no)?</p><input id=\'scd\' placeholder=\'Type answer here...\'>\n<p>What is the first letter of the alphabet?</p><input id=\'trd\' placeholder=\'Type answer here...\'><button onclick=\'chek()\'>Check All!</button>'
  } 
  else if(cols.includes(test)) {
    body.style.backgroundColor = test
    alert('The background color is now ' + test)
  } 
  else if(test === '') {
    alert('Yeah? What did you say? I couldn\'t hear you.')
  }
  else if(test === 'die') {
    body.innerHTML = '<input placeholder=\'Password...\' id=\'passtodie\' type=\'password\'><button onclick=\'passchekdie()\'>Kill</button>'
  } 
  else if(test === 'codes') {
    body.innerHTML = '<select id=\'code\'><option value=\'link\'>Link</option><option value=\'html\'>HTML</option><option value=\'test\'>Test</option><option value=\'die\'>Die</option><option value=\'bgcol\'>Background Color</option></select><button onclick=\'codeit()\'>Select</button>'
  } 
  else if(test.includes('nice') || test.includes('Nice')) {
    alert('Why Thank you!')
  }
  else if(test.includes('mean') || test.includes('Mean')) {
    alert('WHY YOU!')
  } 
  else if(test === 'typer') {
    body.innerHTML = ''
    var seenser = ''
    var h1type = document.createElement('h3')
    body.appendChild(h1type)
    function keysense(event) {
      h1type.innerHTML += event.key + ' '
      console.log(event.code)
      seenser += event.key
      if(event.key === 'Enter' && seenser.includes('homeEnter')) {
        body.innerHTML = '<a href=\'\'>Go</a>'
      }
      else if(event.key === 'Enter' && seenser.includes('boutmeEnter')) {
        body.innerHTML = '<a href=\'about_me.html\'>Go</a>'
      }
    }
    body.addEventListener('keyup', keysense)
  }
  else if(test === 'ascii') {
    body.innerHTML = '<h1>Press a Key</h1>'
    function keeysens(event) {
      key = event.key
      askey = ascii[key]
      alert(askey)
      console.log(askey)
    }
    body.addEventListener('keyup', keeysens)
  } 
  else if(test === 'view') {
    body.style.color = 'white'
    body.textContent = body.innerHTML
  } 
  else if(test === 'links') {
    body.innerHTML = '<input placeholder=\'Password...\' id=\'passmeet\' type=\'password\'><button onclick=\'passmeet()\'>ENTER</button>'
  } 
  else if(test === 'fav') {
    body.innerHTML = '<img src = \'' + fav.href + '\'>'
  } 
  else if(test === 'biglert') {
    alert('HUGE\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nALERTTTTT!!\n\n\n\n\n\n')
  } else {
    alert('You said \'' + test + '\'')
  }
}
var passmeet = function() {
  var passmeet = document.getElementById('passmeet').value
  if(passmeet === 'schol') {
    body.innerHTML = '<a href=\'https://meet.google.com/etc-gbrs-rgh?authuser=0\'>Block</a><label>--></label><a href=\'https://pleasantonusd.zoom.us/j/99126679187?pwd=TlVBbUU5bU42b0pQcmhqWC9jR0o3dz09\'>Band</a><label>--></label><a href=\'https://classroom.google.com/u/0/c/MTIyODcwNjc5MTk2\'>P.E.</a><label>--></label><a href=\'https://pleasantonusd.zoom.us/j/94441903634 \'>Math</a><label>--></label><a href=\'https://pleasantonusd.zoom.us/j/98935815566\'>Science</a>'
  }
}
var passchekdie = function() {
  passtodie = document.getElementById('passtodie').value
  if(passtodie === '<die>') {
    if(confirm('DO you wish to continue?')){
      body.innerHTML = ''
      document.getElementById('head').innerHTML = '<link rel="shortcut icon" type="image/png" href="Untitled drawing.png">'
    }
  } else if(passtodie === '<nice>') {
    body.innerHTML = ''
    body.style.backgroundImage = 'url(imgs/smile.gif)'
  } else if(passtodie === '<mean>') {
    body.innerHTML = ''
    body.style.backgroundImage = 'url(imgs/static.gif)'
  } else {
    body.style.backgroundColor = 'red'
    body.innerHTML = '<h1 id=\'acde\'>ACCESS DENIED</h1>'
    document.getElementById('acde').style.color = 'black'
  }
}
var codeit = function() {
  code = document.getElementById('code').value
  if(code === 'link') {
    body.innerHTML = '<input id=\'linker\' placeholder=\'Type a link here....\'>\n<button id=\'clsa\' onclick=\'fileswitch()\'>Click to save!</button>\n<a id=\'linksto\' href=\'\'>Click me to go to the link!</a>'
  }
  else if(code === 'html') {
    body.innerHTML = '<input id=\'htmlify\' placeholder=\'Type some HTML here...\'>\n<button onclick=\'run()\'>Run</button>'
  }
  else if(code === 'test') {
    body.innerHTML = '<p>How many states are there in the US?</p><input id=\'fst\' placeholder=\'Type answer here...\'>\n<p>Are there three primary colors for light(Yes or no)?</p><input id=\'scd\' placeholder=\'Type answer here...\'>\n<p>What is the first letter of the alphabet?</p><input id=\'trd\' placeholder=\'Type answer here...\'><button onclick=\'chek()\'>Check All!</button>'
  }
  else if(code === 'die') {
    body.innerHTML = '<input placeholder=\'Password...\' id=\'passtodie\' type=\'password\'><button onclick=\'passchekdie()\'>Enter</button>'
  }
  else if(code === 'bgcol') {
    body.innerHTML = '<input id=\'bgcoler\' placeholder=\'Type a color here...\'><button onclick=\'make()\'>Make</button>'
  }
}
var make = function() {
  var bgcoler = document.getElementById('bgcoler').value
  body.style.color = bgcoler
}
var chek = function() {
  var score = 0
  var fst = document.getElementById('fst').value
  var scd = document.getElementById('scd').value
  var trd = document.getElementById('trd').value
  var quecou = 3
  if(fst === '50') {
    score = Math.round(100/quecou)
  }
  if(scd === 'Yes' || scd === 'yes') {
    score = Math.round(100/quecou * 2)
  }
  if(trd === 'A' || trd === 'a') {
    score = Math.round(100/quecou * 3)
  }
  alert(score.toString() + '%')
  body.innerHTML = '<a href=\'\'>Continue</a>'
}
var runhead = function() {
  var htmlify = document.getElementById('htmlify').value
  var head = document.getElementById('head')
  head.innerHTML = htmlify
}
var run = function() {
  var htmlify = document.getElementById('htmlify').value
  body.innerHTML = htmlify
}
var fileswitch = function() {
  var linker = document.getElementById('linker').value
  var linksto = document.getElementById('linksto')
  linksto.attributes[1].value = linker
}
var mix = function() {
  Abme.attributes[0].value = 'contact_me.html'
  repl.attributes[0].value = 'about_me.html'
  khan.attributes[0].value = 'https://repl.it/@ShivankChhaya'
  conme.attributes[0].value = 'https://www.khanacademy.org/profile/paperairplane12200978NINE/projects'
  console.log('Links mixed.')
}
var button = function() {
  alert('Hi! Are you having a good day? If not, I hope this makes you feel better.')
  body.innerHTML = ''
  body.style.backgroundImage = 'url(imgs/smile.gif)'
}
var spamalerts = function() {
  alert('Grrrrr...')
  alert('I am very mean!!')
  alert('I WILL ATTACK THIS DEVICE!!')
  body.innerHTML = ''
  body.style.backgroundImage = 'url(imgs/static.gif)'
}
function table(element, h1, h2, h3, r11, r21, r31, r12, r22, r32, color, bgcol, font) {
  element.innerHTML += '<table id=\'taable\'><tr><th>' + h1 + '</th><th>' + h2 + '</th><th>' + h3 + '</th></tr><tr><td>' + r11 + '</td><td>' + r21 + '</td><td>' + r31 + '</td></tr><tr><td>' + r12 + '</td><td>' + r22 + '</td><td>' + r32 + '</td></tr></table>'
  var taable = document.getElementById('taable')
  taable.style.color = color
  taable.style.backgroundColor = bgcol
  taable.style.fontFamily = font
}
/*<input type="button">
<input type="checkbox">
<input type="color">
<input type="date">
<input type="datetime-local">
<input type="email">
<input type="file">
<input type="hidden">
<input type="image">
<input type="month">
<input type="number">
<input type="password">
<input type="radio">
<input type="range">
<input type="reset">
<input type="search">
<input type="submit">
<input type="tel">
<input type="text">
<input type="time">
<input type="url">
<input type="week">*/