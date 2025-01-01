String.prototype.capsEveryWord = function() {
	const arr = this.split(" ");
	//loop through each element of the array and capitalize the first letter.
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}
	//Join all the elements of the array back into a string 
	//using a blankspace as a separator 
	const str2 = arr.join(" ");
	return str2
}
var place = new URLSearchParams(window.location.search).get('place')
document.getElementsByTagName('title')[0].innerText = place.capsEveryWord()
document.getElementById('header').innerText = place.capsEveryWord()
fetch('sentences.json').then(function(r) {
	r.json().then(function(json) {
		document.getElementById('descrip').innerText = json[place]
	})
})
var cards = document.getElementsByClassName('card')
for (var i = 0; i < 3; i++) {
	var img = document.createElement('img')
	img.className = 'card-img-top'
	img.setAttribute('src', `${place}${i+1}.png`)
	cards[i].append(img)
}
