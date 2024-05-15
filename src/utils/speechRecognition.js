import axios from 'axios';


const openAiKey = process.env.REACT_APP_OPENAI_API_KEY;

let recognition;
let setRecognizedText;
let setIsListening;
let setGeneratedMessage;
let voices;

export function setupSpeechRecognition(setRecognizedTextCallback, setIsListeningCallback, setGeneratedMessageCallback) {
    setRecognizedText = setRecognizedTextCallback;
    setIsListening = setIsListeningCallback;
    setGeneratedMessage = setGeneratedMessageCallback;

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

    recognition.onresult = async (event) => {
        const result = event.results[0][0].transcript;
        console.log('Recognized speech:', result);
        setRecognizedText(result);
        setIsListening(false);
        
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "you are a robot creature not an assistant . that can hear me "
                    },
                    {
                        role: "user",
                        content: result
                    }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer ${openAiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response data:', response.data); // Log the response data
            const generatedMessage = response.data.choices[0].message.content;
            console.log('Generated message:', generatedMessage);

            // Set the generated message state
            setGeneratedMessage(generatedMessage);
            speak(generatedMessage);
        } catch (error) {
            console.error('Error generating text:', error);
        }
    };
}
// Wait for voices to be loaded
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
};

const speak = (text) => {
    // Check if voices are loaded, if not, return
    if (voices.length === 0) {
        console.log('Voices not loaded yet');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Select the voice you want to use
    utterance.voice = voices[1]; // Selecting the second voice, you may need to adjust this index
    window.speechSynthesis.speak(utterance);
};