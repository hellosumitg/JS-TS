// Check if SpeechRecognition API is supported and assign it to window.SpeechRecognition(supported by firefox) or fallback to window.webkitSpeechRecognition(supported by chrome)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// Create a new instance of SpeechRecognition
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
// Set interimResults property to true, so that interim results are provided as the user speaks
recognition.interimResults = true;
// Set language to US English
recognition.lang = 'en-US';
// Create a <p> element to display the recognized speech
var p = document.createElement('p');
// Select the element with class "words" and append the <p> element to it
var words = document.querySelector('.words');
words.appendChild(p);
// Add an event listener to the recognition object for the "result" event
recognition.addEventListener('result', function (e) {
    // Map over the speech recognition results and extract the transcript
    var transcript = Array.from(e.results)
        .map(function (result) { return result[0]; })
        .map(function (result) { return result.transcript; })
        .join('');
    // Replace certain words with 🦄 emoji in the transcript
    var unicornScript = transcript.replace(/unicorn|uni|uniswap|billion/gi, '🦄');
    // Set the modified transcript as the text content of the <p> element
    p.textContent = unicornScript;
    // If the first result isFinal (complete), create a new <p> element and append it to "words"
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});
// Add an event listener to the recognition object for the "end" event, and call recognition.start() to restart the recognition
recognition.addEventListener('end', function () {
    recognition.start();
});
// Start the speech recognition
recognition.start();
