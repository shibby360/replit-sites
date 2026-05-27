function clear() {
  if(document.getElementsByTagName('input')[0].style.color === 'red') {
    document.getElementsByTagName('input')[0].value = ''
  }
}
function active() {
  if(document.getElementsByTagName('input')[0].style.color === 'red') {
    document.getElementsByTagName('input')[0].value = ''
  }
  try {
    document.getElementsByTagName('input')[0].value = eval(document.getElementsByTagName('input')[0].value)
    ans = eval(document.getElementsByTagName('input')[0].value)
  }
  catch(err) {
    document.getElementsByTagName('input')[0].style.color = 'red'
    document.getElementsByTagName('input')[0].value = 'Err'
  }
}
function addval(val) {
  if(document.getElementsByTagName('input')[0].style.color === 'red') {
    document.getElementsByTagName('input')[0].value = ''
  }
  document.getElementsByTagName('input')[0].style.color = textcol
  document.getElementsByTagName('input')[0].value += val
}
function ansser() {
  if(document.getElementsByTagName('input')[0].style.color === 'red') {
    document.getElementsByTagName('input')[0].value = ''
  }
  try {
    document.getElementsByTagName('input')[0].style.color = textcol
    document.getElementsByTagName('input')[0].value += ans
  }
  catch(err) {
    document.getElementsByTagName('input')[0].style.color = 'red'
    document.getElementsByTagName('input')[0].value = 'Ans not defined'
  }
}
function roundit() {
  if(document.getElementsByTagName('input')[0].style.color === 'red') {
    document.getElementsByTagName('input')[0].value = ''
  }
  document.getElementsByTagName('input')[0].style.color = textcol
  var towht = Number(window.prompt('To the nearest what(Put the number; Example:ten=10, tenth=0.1)?: '))
  if(towht > 1) {
    roond = Math.round(Number(document.getElementsByTagName('input')[0].value)/towht) * towht
  } else if(towht < 1) {
    roond = Number(document.getElementsByTagName('input')[0].value).toFixed(towht.toString().length-2)
  }
  document.getElementsByTagName('input')[0].value = roond
}
function frationze() {
  if(document.getElementsByTagName('input')[0].style.color === 'red') {
    document.getElementsByTagName('input')[0].value = ''
  }
  document.getElementsByTagName('input')[0].style.color = textcol
  var numer = prompt('What numerator?: ')
  var denom = prompt('What denominator?: ')
  addval(`(${numer}/${denom})`)
}
function factorial(n) {
  if(n === 0) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}
function piyer() {
  if(document.getElementsByTagName('input')[0].style.color === 'red') {
    document.getElementsByTagName('input')[0].value = ''
  }
  document.getElementsByTagName('input')[0].style.color = textcol
  digits = Number(window.prompt('How many decimal digits(Up to 100)?: ', '2'))
  document.getElementsByTagName('input')[0].value += 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679.toFixed(digits)
}
function sqr2() {
  clear()
  document.getElementsByTagName('input')[0].value = Math.sqrt(Number(document.getElementsByTagName('input')[0].value))
}


document.getElementsByTagName('input')[0].title = 'Your equation goes here'
buttons = document.getElementsByTagName('button')
for(var i = 1; i < buttons.length; i++) {
  buttons[i].title = buttons[i].id
}