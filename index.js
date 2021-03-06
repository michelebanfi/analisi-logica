function verbo() {
  var parola = document.getElementById("input").value;
  var verbo = document.createElement("div");
  verbo.className = "verbo";
  var verboContent = document.createTextNode(parola);
  verbo.appendChild(verboContent);
  document.getElementById("nucleo").appendChild(verbo);
}
function soggetto() {
  var parola = document.getElementById("input").value;
  var verbo = document.createElement("div");
  verbo.className = "soggetto";
  var verboContent = document.createTextNode(parola);
  verbo.appendChild(verboContent);
  document.getElementById("nucleo").appendChild(verbo);
}
function argomenti() {
  var parola = document.getElementById("input").value;
  var verbo = document.createElement("div");
  verbo.className = "argomenti";
  var verboContent = document.createTextNode(parola);
  verbo.appendChild(verboContent);
  document.getElementById("nucleo").appendChild(verbo);
}
function diretto() {
  var verbo = document.createElement("div");
  verbo.className = "diretto";
  document.getElementById("nucleo").appendChild(verbo);
}
function indiretto() {
  var wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  let diretto = document.createElement("div");
  diretto.className = "diretto";
  let indiretto = document.createElement("div");
  indiretto.className = "indiretto";
  wrapper.appendChild(diretto);
  wrapper.appendChild(indiretto);
  document.getElementById("nucleo").appendChild(wrapper);
}
function image() {
  html2canvas(document.getElementById("nucleo")).then((canvas) => {
    var a = document.createElement("a");
    a.href = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    a.download = "image.jpg";
    a.click();
  });
}
