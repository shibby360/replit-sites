var board = document.querySelector('#board')
var x = 0
var y = 0
var picks = [board.children[0]]
function min(x) {
	if(x < 0) {
		return 0
	} else {
		return x
	}
}
function max(x, t) {
	if(t === 'x') {
		if(x > innerWidth) {
			return innerWidth
		} else {
			return x
		}
	}
	if(t === 'y') {
		if(x > innerHeight) {
			return innerHeight
		} else {
			return x
		}
	}
}
var int = setInterval(function() {
	try {
	var rects = []
	for(var i = 0; i < 4; i++) {
		var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
		rect.style.fill = `rgb(${x+y}, ${0}, ${0})`
		rect.setAttribute('width', 10)
		rect.setAttribute('height', 10)
		rects.push(rect)
		board.appendChild(rect)
	}
	rects[0].setAttribute('x', max(x+10, 'x'))
	rects[0].setAttribute('y', y)
	rects[1].setAttribute('x', x)
	rects[1].setAttribute('y', max(y+10, 'y'))
	rects[2].setAttribute('x', min(x-10))
	rects[2].setAttribute('y', y)
	rects[3].setAttribute('x', x)
	rects[3].setAttribute('y', min(y-10))
	// var nc = board.children[Math.floor(Math.random() * board.children.length)]
	var nc = picks[Math.floor(Math.random() * picks.length)]
	x = nc.getBoundingClientRect().x
	y = nc.getBoundingClientRect().y
	picks = rects
	} catch(err) {
		clearInterval(int)
		console.log(err)
	}
})
document.body.addEventListener('click', function() {
	clearInterval(int)
})