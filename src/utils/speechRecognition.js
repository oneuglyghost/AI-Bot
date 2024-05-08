let recognition;

export function setupSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            console.log('Recognized speech:', result);
            // Handle the recognized speech, e.g., send it to an API 
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    } else {
        console.log('Web Speech API is not supported in this browser');
    }
}

export function startSpeechRecognition() {
    if (recognition) {
        recognition.start();
    } else {
        console.error('Speech recognition has not been set up');
    }
}