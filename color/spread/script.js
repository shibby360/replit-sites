var board = document.querySelector('#board')
var x = 0
var y = 0
var px = []
var py = []
var int = setInterval(function() {
	var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
	rect.style.fill = `rgb(${y}, ${x}, ${0})`
	rect.setAttribute('x', x)
	rect.setAttribute('y', y)
	// var wh = Math.floor(Math.random()*30)
	var wh = 10
	rect.setAttribute('width', wh)
	rect.setAttribute('height', wh)
	function pick() {
		var ch = ['x', 'y'][Math.floor(Math.random() * 2)]
		var fns = [function(x) {return x+wh}, function(x) {return x-wh}]
		var fn = fns[Math.floor(Math.random() * 2)]
		if(ch === 'x') {
			x = fn(x)
			if(x < 0) {
				x = 0
			}
			if(x > innerWidth) {
				x = innerWidth
			}
		} else {
			y = fn(y)
			if(y < 0) {
				y = 0
			}
			if(y > innerHeight) {
				y = innerHeight
			}
		}
		return [ch, fns.indexOf(fn)]
	}
	var pkd = pick()
	var tries = 0
	while(x in px && y in py) {
		if(pkd[0] === 'x') {
			if(pkd[1] === 0) {
				x -= wh
			} else {
				x += wh
			}
		} else {
			if(pkd[1] === 0) {
				y -= wh
			} else {
				y += wh
			}
		}
		pkd = pick()
		tries += 1
		if(tries === 2) {
			break
		}
	}
	px.push(x)
	py.push(y)
	board.appendChild(rect)
})
document.body.addEventListener('click', function() {
	clearInterval(int)
})