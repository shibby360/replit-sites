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
var cam = "environment"

function start(redo) {
	// The width and height of the captured photo. We will set the
	// width to the value defined here, but the height will be
	// calculated based on the aspect ratio of the input stream.

	var width = 320;    // We will scale the photo width to this
	var height = 0;     // This will be computed based on the input stream

	// |streaming| indicates whether or not we're currently streaming
	// video from the camera. Obviously, we start at false.

	var streaming = false;

	// The various HTML elements we need to configure or control. These
	// will be set by the startup() function.

	var video = null;
	var canvas = null;
	var photo = null;
	var startbutton = null;

	function startup() {
		video = document.getElementById('video');
		canvas = document.getElementById('canvas');
		photo = document.getElementById('photo');
		para = document.getElementById('datauri');
		startbutton = document.getElementById('startbutton');

		navigator.mediaDevices.getUserMedia({audio: false, video:{ facingMode:cam}})
		.then(function(stream) {
			video.srcObject = stream;
			video.play();
		})
		.catch(function(err) {
			console.log("An error occurred: " + err);
		});

		video.addEventListener('canplay', function(ev){
			if (!streaming) {
				height = video.videoHeight / (video.videoWidth/width);
			
				// Firefox currently has a bug where the height can't be read from
				// the video, so we will make assumptions if this happens.
			
				if (isNaN(height)) {
					height = width / (4/3);
				}
			
				video.setAttribute('width', width);
				video.setAttribute('height', height);
				canvas.setAttribute('width', width);
				canvas.setAttribute('height', height);
				streaming = true;
			}
		}, false);

		startbutton.addEventListener('click', function(ev){
			takepicture();
			ev.preventDefault();
		}, false);
		
		clearphoto();
	}

	// Fill the photo with an indication that none has been
	// captured.

	function clearphoto() {
		canvas.style.display = 'inline-block'
		var context = canvas.getContext('2d');
		context.fillStyle = "#AAA";
		context.fillRect(0, 0, canvas.width, canvas.height);
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data)
		canvas.style.display = 'none'
	}
	
	// Capture a photo by fetching the current contents of the video
	// and drawing it into a canvas, then converting that to a PNG
	// format data URL. By drawing it on an offscreen canvas and then
	// drawing that to the screen, we can change its size and/or apply
	// other changes before drawing it.

	function takepicture() {
		canvas.style.display = 'inline-block'
		var context = canvas.getContext('2d');
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			context.filter = getComputedStyle(video).filter;
			context.drawImage(video, 0, 0, width, height);
			// Shaq filter
			// var img = document.createElement('img')
			// img.src = 'shaq.png'
			// context.drawImage(img, 0, 0, 100, 100)
			var data = canvas.toDataURL('image/png');
			photo.setAttribute('src', data)
			navigator.clipboard.writeText(data)
			if(document.querySelector('#autodwn').checked) {
				var a = document.createElement('a')
				a.href = data
				a.download = document.querySelector('#dwnnm').value + '.png'
				a.click()
			}
			canvas.style.display = 'none'
		} else {
			clearphoto();
		}
	}

	// Set up our event listener to run the startup process
	// once loading is complete.
	if(redo) {
		startup()
	}
	window.addEventListener('load', startup, false);
}
start()
function Filter(el) {
	this.blur = 0
	this.brightness = 100
	this.contrast = 100
	this.grayscale = 0
	this.hueRotate = 0
	this.invert = 0
	this.opacity = 100
	this.saturation = 100
	this.sepia = 0
	this.save = function() {
		el.style.filter = 'blur(' + this.blur + 'px) brightness(' + this.brightness + '%) contrast(' + this.contrast + '%) grayscale(' + this.grayscale + '%) hue-rotate(' + this.hueRotate + 'deg) invert(' + this.invert + '%) opacity(' + this.opacity + '%) saturate(' + this.saturation + '%) sepia(' + this.sepia + '%)'
	}
}
var filter = new Filter(document.querySelector('video'))
var filtermenu = document.querySelector('#filtermenu')
for(var i = 1; i <= filtermenu.childElementCount; i += 3) {
	filtermenu.children[i].addEventListener('mousemove', function(ev) {
		filter[ev.srcElement.getAttribute('name')] = Number(ev.srcElement.value)
		filter.save()
	})
}
document.querySelector('#satur').addEventListener('click', function() {
	document.querySelector('input[name="saturation"]').value = "100"
	filter.saturation = 100
	filter.save()
})
var filterbtn = document.querySelector('#filterbutton')
filterbtn.addEventListener('click', function(ev) {
	document.querySelector('#filtermenu').style.opacity = getComputedStyle(document.querySelector('#filtermenu')).opacity === "1" ? "0" : "1"
	ev.srcElement.style.opacity = document.querySelector('#filtermenu').style.opacity
	document.querySelector('#options').style.opacity = document.querySelector('#filtermenu').style.opacity
})
document.querySelector('#options').children[2].addEventListener('change', function() {
	document.querySelector('#dwnnm').style.opacity = getComputedStyle(document.querySelector('#dwnnm')).opacity === "1" ? "0" : "1"
})
document.querySelector('#options').children[6].addEventListener('change', function(ev) {
	document.querySelector('video').style.display = ev.srcElement.checked ? "none" : "initial"
})