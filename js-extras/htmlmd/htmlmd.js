function htmltomd(html) {
	var end = html
	for(var i = 0; i < 7; i++) {
		end = end.replaceAll(`<h${i}>`, '#'.repeat(i)+' ').replaceAll(`</h${i}>`, '\n')
	}
	end = end.replaceAll('<i>', '_').replaceAll('</i>', '_')
	end = end.replaceAll('<strong>', '*').replaceAll('</strong>', '*')
	end = end.replaceAll('<ul>', '').replaceAll('</ul>').replaceAll('<ol>', '').replaceAll('</ol>', '')
	end = end.replaceAll('<li>', '+').replaceAll('</li>', '\n')
	end = end.replaceAll('<pre><code>', '```').replaceAll('</code></pre>', '```')
	return end
}
function mdtohtml(md, doc=false, title=null) {
	var end = md
	let t = 0
	end = end.replaceAll(/```/g, match => ++t % 2 ? '<pre><code>' : '</code></pre>')
	var toparse
	end = end.replaceAll(/\\/g, '<br>')
	end = end.split('\n')
	for(var i = 0; i < end.length; i++) {
		var j = end[i]
		if(j.startsWith('#')) {
			var spaceat = j.indexOf(' ')
			if(j.substring(0, spaceat) === '#'.repeat(j.substring(0, spaceat).length)) {
				var htype = j.substring(0, spaceat).length
				j = j.replace('#'.repeat(htype)+' ', '<h'+htype+'>')
				j += '</h'+htype+'>'
			}
		}
		if(j.startsWith('+')) {
			j = j.replace('+ ', '<li>')
			j += '</li>'
		}
		if(j.startsWith('<pre><code>')) {
			var lang = j.replace('<pre><code>', '')
			j = j.replace(lang, '')
			j = j.replace('<pre>', '<pre class="language-' + lang + '">')
			toparse = false
		}
		if(j.endsWith('</code></pre>')) {
			toparse = true
		}
		if(toparse) {
			let t = 0
			j = j.replaceAll(/_/g, match => ++t % 2 ? '<i>' : '</i>')
			t = 0
			j = j.replaceAll(/\*/g, match => ++t % 2 ? '<strong>' : '</strong>')
			t = 0
			j = j.replaceAll(/`/g, match => ++t % 2 ? '<code>' : '</code>')
			t = 0
			j = j.replaceAll(/~/g, match => ++t % 2 ? '<s>' : '</s>')
			var linkmatches = [...j.matchAll(/\[.+\]\(.+\)/g)]
			for(var i in linkmatches) {
				var match = linkmatches[i][0]
				var link = match.match(/\((.*)\)/).pop()
				var text = match.match(/\[(.*)\]/).pop()
				j = j.replace(match, '<a href="' + link + '">' + text + '</a>')
			}
		}
		end[i] = j
	}
	if(doc) {
		return '<!doctype html>\n<head>\n<meta charset="utf-8">\n<title>' + title + '</title>\n</head>\n<body>\n' + end + '\n</body>\n</html>'
	} else {
		return end.join('\n')
	}
}