var fileinp = document.getElementById('fileinp')
var modeinp = document.getElementById('modeinp')
var changefunc = function() {
  var reader = new FileReader()
  reader.onload = function(e) {
    filter(Number(modeinp.value), e.target.result)
    if(["31", "32"].includes(modeinp.value)) {
      modeinp.onchange()
    }
  }
  reader.readAsDataURL(fileinp.files[0])
}
fileinp.onchange = changefunc
modeinp.onchange = changefunc
document.getElementById('download').addEventListener('click', function(ev) {
  var ctx = document.getElementById('canvas1').getContext("2d")
  var a = document.createElement('a')
  a.href = document.getElementById('canvas1').toDataURL('image/png')
  a.download = 'image.png'
  a.click()
})