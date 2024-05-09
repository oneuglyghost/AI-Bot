import React, { useEffect } from 'react';
import { setupSpeechRecognition, startSpeechRecognition } from './utils/speechRecognition';

const App = () => {
    const [recognizedText, setRecognizedText] = React.useState('');
    const [generatedMessages, setGeneratedMessages] = React.useState([]);
    const [isListening, setIsListening] = React.useState(false);

    useEffect(() => {
        setupSpeechRecognition(handleRecognitionResult, setIsListening, setGeneratedMessages);
    }, []);

    const handleRecognitionResult = (recognized, generated) => {
        setRecognizedText(recognized);
        setGeneratedMessages(prevMessages => [...prevMessages, generated]);
    };

    const handleStartRecognition = () => {
        startSpeechRecognition();
    };

    return (
        <div>
            <h1>Voice to Text</h1>
            <button style={{ backgroundColor: isListening ? 'red' : 'green' }} onClick={handleStartRecognition}>
                {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <div>
                <p>Recognized Text: {recognizedText}</p>
                <p>Generated Messages: {generatedMessages}</p>
            </div>
        </div>
    );
};

export default App;