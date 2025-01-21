var time = new Date()
var hourhand = document.querySelector('#hourhand')
var minutehand = document.querySelector('#minutehand')
setInterval(function() {
	time = new Date()
	var hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
	hourhand.style.transform = 'rotate(' + (hours * 30) + 'deg)'
	minutehand.style.transform = 'rotate(' + (time.getMinutes() * 6) + 'deg)'
})