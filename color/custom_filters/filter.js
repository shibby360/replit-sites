function filterer(code, vals) {
	var r = vals[0]
	var g = vals[1]
	var b = vals[2]
	if(code === 0) {
		return [r, g, b]
	}
	else if(code === 1) {
		return hslToRgb(r, b, g)
	}
	else if(code === 2) {
		var gray = (r+g+b)/3
		return [gray, gray, gray]
	}
	else if(code === 3) {
		return [b, g, r]
	}
	else if(code === 4) {
		return [g, b, r]
	}
	else if(code === 5) {
		return [b, r, g]
	}
	else if(code === 6) {
		return [r, b, g]
	}
	else if(code === 7) {
		return [255-r, 255-b, 255-g]
	}
	else if(code === 8) {
		var gray = (r+g+b)/3
		var end = gray < 255/2 ? 0 : 255
		return [end, end, end]
	}
	else if(code === 9) {
		return [Math.random() * 255, g, b]
	}
	else if(code === 10) {
		return [r, Math.random() * 255, b]
	}
	else if(code === 11) {
		return [r, g, Math.random() * 255]
	}
	else if(code === 12) {
		return [0, 0, b]
	}
	else if(code === 13) {
		return [r, 0, 0]
	}
	else if(code === 14) {
		return [0, b, 0]
	}
	else if(code === 15) {
		var maxi = Math.max(r, g, b)
		return Array.from([r, g, b], item => item == maxi?item:0);
	}
	else if(code === 16) {
		return [r+255/2, g+255/2, b+255/2]
	}
	else if(code === 17) {
		return [r-255/2, g-255/2, b-255/2]
	}
	else if(code === 18) {
		var maxi = Math.max(r, g, b)
		var nrgb = Array.from([r, g, b], item => item === maxi?item:0)
		return Array.from(nrgb, item => item >= 255/2?255:0)
	}
	else if(code === 19) {
		return [0, g, b]
	}
	else if(code === 20) {
		return [r, 0, b]
	}
	else if(code === 21) {
		return [r, g, 0]
	}
	else if(code === 22) {
		return [255, g, b]
	}
	else if(code === 23) {
		return [r, 255, b]
	}
	else if(code === 24) {
		return [r, g, 255]
	}
	else if(code === 25) {
		var maxi = Math.min(r, g, b)
		return Array.from([r, g, b], item => item == maxi?item:0);
	}
	else if(code === 26) {
		var maxi = Math.min(r, g, b)
		var nrgb = Array.from([r, g, b], item => item == maxi?item:0)
		return Array.from(nrgb, item => item >= 255/2?255:0)
	}
	else if(code === 27) {
		return [r > 255/2 ? 255 : 0, g > 255/2 ? 255 : 0, b > 255/2 ? 255 : 0]
	}
	else if(code === 28) {
		return [r > 255/2 ? 0 : 255, g > 255/2 ? 0 : 255, b > 255/2 ? 0 : 255]
	}
	else if(code === 29) {
		var maxi = Math.max(...[r, g, b])
		var nrgb = [r, g, b]
		for(var i in nrgb) {
			if(nrgb[i] === maxi) {
				nrgb[i] = 255 - nrgb[i]
			}
		}
		return nrgb
	}
	else if(code === 30) {
		var maxi = Math.min(...[r, g, b])
		var nrgb = [r, g, b]
		for(var i in nrgb) {
			if(nrgb[i] === maxi) {
				nrgb[i] = 255 - nrgb[i]
			}
		}
		return nrgb
	}
}
function hslToRgb(h,s,l){
	var r, g, b;
	if(s == 0) {
		r = g = b = l;
	} else {
		function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}
CanvasRenderingContext2D.prototype.createFrame = function(img, size, width, height) {
	for(var k = 0; k <= this.canvas.width; k += size) {
		this.drawImage(img, k, 0, size, size)
		this.drawImage(img, k, this.canvas.height-size, size, size)
	}
	for(var j = 0; j <= this.canvas.height; j += size) {
		this.drawImage(img, 0, j, size, size)
		this.drawImage(img, this.canvas.width-size, j, size, size)
	}
}
function filter(code, imgsrc) {
	var c = document.getElementById('canvas1');
	var ctx = c.getContext('2d');
	var img = document.createElement('img')
	img.src = imgsrc
	img.onload = function() {
		ctx.clearRect(0, 0, c.width, c.height)
		ctx.drawImage(img, 0, 0, c.width, c.height);
		var imgData = ctx.getImageData(0, 0, c.width, c.height);
		if(code === 31) {
			var imgg = document.createElement('img')
			imgg.src = 'shaq.png'
			ctx.createFrame(imgg, 25)
			return
		}
		if(code === 32) {
			imgData.data.set(imgData.data.reverse())
			ctx.putImageData(imgData, 0, 0)
			return
		}
		if(code === 33) {
			function modify(arr) {
				var n = arr.length
				if (n <= 1) {
					return
				}
				let prev = arr[0]
				arr[0] = arr[0] * arr[1]
				for (let i = 1; i < n - 1; i++) {
					let curr = arr[i];
					arr[i] = prev + arr[i+1];
					prev = curr;
				}
				arr[n-1] = prev + arr[n-1];
				return arr
			}
			imgData.data.set(modify(imgData.data))
			ctx.putImageData(imgData, 0, 0)
			return
		}
		if(code === 35) {
			return
		}
		for(var i = 0; i < imgData.data.length; i += 4) {
			var rgblist = [imgData.data[i], imgData.data[i+1], imgData.data[i+2]]
			var filtered = filterer(code, rgblist)
			imgData.data[i] = filtered[0]
			imgData.data[i+1] = filtered[1]
			imgData.data[i+2] = filtered[2]
		}
		ctx.putImageData(imgData, 0, 0);
		img.remove()
	}
}