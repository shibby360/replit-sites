var board = document.querySelector('#board')
function fn() {
	var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
	rect.setAttribute('width', 10)
	rect.setAttribute('height', 10)
	rect.setAttribute('x', Math.floor(Math.random()*innerWidth))
	rect.setAttribute('y', Math.floor(Math.random()*innerHeight))
	board.appendChild(rect)
	clearTimeout(int)
}
for(var i = 100000; i > 0; i -= 1) {
	var int = setTimeout(fn, i)
}
document.body.addEventListener('click', function() {
	clearInterval(int)
})