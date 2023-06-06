// Website for keycode information: https://www.toptal.com/developers/keycode
// Use `keydown` or `keypress` for KeyboardEvent and `click` for PointerEvent
function removeTransition(e) {
    // console.log(e);
    if (e.propertyName !== "transform")
        return; // skip it if it's not a transform
    // console.log(e.propertyName);
    // console.log(this); // outputs similar result to `console.log(key)` as it was called against the `key` in the below line
    //  `keys.forEach((key) => key.addEventListener("transitionend", removeTransition));`
    this.classList.remove("playing"); // similar to `key.classList.remove("playing");`
}
function playSound(e) {
    // console.log(e);
    // console.log(e.keyCode);
    var audio = document.querySelector("audio[data-key=\"".concat(e.keyCode, "\"]"));
    var key = document.querySelector(".key[data-key=\"".concat(e.keyCode, "\"]"));
    // console.log(audio); // gives the audio associated with the key otherwise null
    if (!audio)
        return; // stop the function from running altogether
    audio.currentTime = 0; // rewind to the start as if we directly play the audio for multiple key press it will play once
    audio.play();
    // console.log(key);
    if (!key)
        return;
    key.classList.add("playing");
    // key.classList.toggle("playing");
}
var keys = document.querySelectorAll(".key");
keys.forEach(function (key) { return key.addEventListener("transitionend", removeTransition); });
window.addEventListener("keydown", playSound);
