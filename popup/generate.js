var copyText = document.querySelector("#input");
copyText.value = genPass(20);

var toggle = document.querySelector("#toggle");
toggle.addEventListener("click", function () {
    copyText.classList.toggle("hide");
    if (toggle.innerHTML == "Hide") {
        toggle.innerHTML = "Show"
    } else {
        toggle.innerHTML = "Hide"
    }
  });

document.querySelector("#copy").addEventListener("click", function () {
  copyText.select();
  document.execCommand("Copy");
});

function genPass(len) {
    if (!isAN(len)) {
        return "";
    }
    var buffer = new Uint32Array(Math.ceil(len / 5) * 4);
    window.crypto.getRandomValues(buffer);
    return base85Encode(buffer).substring(0, len);
}

function isAN(value) {
    return (value instanceof Number||typeof value === 'number') && !isNaN(value);
}
