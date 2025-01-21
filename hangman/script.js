// var words = ['sagevyasa', 'mahabharata', 'satyavati', 'bharata', 'ganga', 'devarata', 'santanu', 'bheeshma']
var words = ['apple', 'orange', 'banana', 'lemon', 'grape', 'kiwi','mango', 'coconut', 'watermelon', 'lime', 'banana', 'lemon', 'grape', 'kiwi','mango', 'coconut', 'watermelon', 'lime', 'banana', 'lemon', 'grape', 'kiwi','mango', 'coconut', 'watermelon', 'lime', 'banana', ]
var word = words[Math.floor(Math.random() * words.length)]
document.getElementById('word').childNodes[0].nodeValue = '_ '.repeat(word.length)
var guessKey = ''
var partToShow = 1
var guessed = []
function onKeyPress(e) {
	if(e.key.match(/[a-z]/i)) {
		document.getElementById('letter').children[1].childNodes[0].nodeValue = 'Guess ' + e.key
		guessKey = e.key
	}
}
document.body.addEventListener('keypress', onKeyPress)
function onBtnClick(e) {
	if(!document.getElementById('word').innerHTML.includes('_')) {
		document.getElementById('wintext').style.display = 'block'
		return
	}
	if(partToShow > 6) {
		document.getElementById('losetext').style.display = 'block'
		return
	}
	var newword = word.split('').join(' ')
	var matches = [...newword.matchAll(new RegExp(guessKey, 'g'))]
	console.log(matches)
	if(matches.length === 0 && !guessed.includes(guessKey)) {
		document.getElementById(partToShow.toString()).style.display = 'block'
		guessed.push(guessKey)
		partToShow ++
		if(partToShow > 6) {
			document.getElementById('losetext').style.display = 'block'
			return
		}
	}
	var newtxt = document.querySelector('#word').innerHTML
	for(var j in matches) {
		var i = matches[j]
		var newnew = newtxt.split('')
		newnew[i.index] = guessKey
		newtxt = newnew.join('')
	}
	document.getElementById('word').innerHTML = newtxt
	if(!document.getElementById('word').innerHTML.includes('_')) {
		document.getElementById('wintext').style.display = 'block'
		return
	}
}
document.getElementById('letter').addEventListener('click', onBtnClick)