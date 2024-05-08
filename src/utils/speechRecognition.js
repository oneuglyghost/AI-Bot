let recognition;
let setRecognizedText;
let setIsListening;

export function setupSpeechRecognition(setRecognizedTextCallback, setIsListeningCallback) {
    setRecognizedText = setRecognizedTextCallback;
    setIsListening = setIsListeningCallback;

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            console.log('Recognized speech:', result);
            setRecognizedText(result);
            recognition.stop(); // Stop listening
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false); // Set listening to false if an error occurs
        };

        recognition.onend = () => {
            setIsListening(false); // Set listening to false when recognition stops
        };
    } else {
        console.log('Web Speech API is not supported in this browser');
    }
}

export function startSpeechRecognition() {
    if (recognition && recognition.state !== 'listening') {
        setIsListening(true);
        recognition.start();
    } else {
        console.error('Speech recognition is already running');
    }
}