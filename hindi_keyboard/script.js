function selectText(node) {
	node = document.getElementById(node);
	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(node);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		console.warn("Could not select text in node: Unsupported browser.");
	}
}
var vowels = ['905','906','907','908','909','90a','90b','90f','910','913','914','905&#x0902','905&#x0903']
var matras = ['94d','93e','93f','940','941','942','943','947','948','94b','94c','902','903']
var consonants = ['915','916','917','918','919','\n','91a','91b','91c','91d','91e','\n','91f','920','921','922','923','\n','924','925','926','927','928','\n','92a','92b','92c','92d','92e','\n','92f','930','932','935','\n','936','937','938','939']
function checkConsonant(letter) {
	return consonants.some(function(el) {
		eval("'\\u0" + `${el}'`)
	})
}
for(var i = 0; i < vowels.length; i++) {
	var btn = document.createElement('button')
	btn.innerHTML = '&#x0'+vowels[i]
	btn.className = 'vowels'
	btn.id = i
	document.querySelector('#keyboard').appendChild(btn)
}
document.querySelector('#keyboard').innerHTML += '<br>'.repeat(2)
for(var i = 0; i < consonants.length; i++) {
	if(consonants[i] === '\n') {
		document.querySelector('#keyboard').appendChild(document.createElement('br'))
		continue
	}
	var btn = document.createElement('button')
	btn.innerHTML = '&#x0'+consonants[i]
	btn.className = 'conso'
	btn.addEventListener('click', function(ev) {
		var vowelbts = Array.from(document.querySelectorAll('.vowels'))
		vowelbts.forEach((el, ind) => {
			el.innerHTML = ev.target.innerText + '&#x0' + matras[ind]
		})
	})
	document.querySelector('#keyboard').appendChild(btn)
}

Array.from(document.querySelectorAll('button:not(#copy)')).forEach((el) => {
	el.addEventListener('click', function(ev) {
		var out = document.querySelector('#out')
		if(ev.target.className === 'vowels' && ev.target.innerText.length === 2) {
			out.innerHTML += '&#x0' + matras[ev.target.id]
		} else {
			out.innerHTML += ev.target.innerText
		}
	})
})

var vowelbts = Array.from(document.querySelectorAll('.vowels'))
vowelbts.forEach((el, ind) => {
	el.addEventListener('click', function(ev) {
		vowelbts.forEach((el, ind) => {
			el.innerHTML = '&#x0' + vowels[ind]
		})
	})
})

document.querySelector('#out').addEventListener('input', function(ev) {
	var vowelbts = Array.from(document.querySelectorAll('.vowels'))
	vowelbts.forEach((el, ind) => {
		if(out.innerText !== '' && checkConsonant(out.innerText.slice(-1))) {
			el.innerHTML = out.innerText.slice(-1) + '&#x0' + matras[ind]
		} else {
			el.innerHTML = '&#x0' + vowels[el.id]
		}
	})
})

function copy() {
	selectText('out')
	navigator.clipboard.writeText(out.innerText)
}