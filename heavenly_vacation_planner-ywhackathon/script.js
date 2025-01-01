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
function search(json, params) {
	var end = []
	for(var place in json) {
		var contains = json[place].some(element => {return params.includes(element)})
		if(contains) {
			end.push(place)
		}
	}
	return end
}
function find() {
	fetch('places.json').then(function(r) {
		r.json().then(function(json) {
			var params = [document.getElementById('attractions').value, document.getElementById('weather').value, document.getElementById('cost').value]
			var results = search(json, params)
			document.getElementById('places').innerHTML = ''
			for(var i in results) {
				var li = document.createElement('li')
				li.innerHTML = `<a href="place.html?place=${results[i]}">` + results[i].capsEveryWord() + '</a>'
				li.className = 'list-group-item'
				document.getElementById('places').append(li)
			}
		})
	})
}