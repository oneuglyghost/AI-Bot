let recognition;
let setRecognizedText; // This variable will hold the setter function for recognizedText

export function setupSpeechRecognition(setter) {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            console.log('Recognized speech:', result);
            if (setRecognizedText) {
                setRecognizedText(result); // Update the recognizedText state in the React component
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        setRecognizedText = setter; // Assign the setter function for recognizedText
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