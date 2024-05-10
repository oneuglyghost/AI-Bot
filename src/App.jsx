import React, { useEffect } from 'react';
import { setupSpeechRecognition, startSpeechRecognition } from './utils/speechRecognition';


const App = () => {
    const [recognizedText, setRecognizedText] = React.useState('');
    const [generatedMessages, setGeneratedMessages] = React.useState([]);
    const [isListening, setIsListening] = React.useState(false);

    useEffect(() => {
        setupSpeechRecognition(handleRecognitionResult, setIsListening, setGeneratedMessages);
    }, [generatedMessages]);

    const handleRecognitionResult = (recognized) => {
        setRecognizedText(recognized);
        setGeneratedMessages(generatedMessages);
    };

    const handleStartRecognition = () => {
        startSpeechRecognition();
    };

    

    return (
        <div>
            <h1>Visual-Echo</h1>
            <button style={{ backgroundColor: isListening ? 'red' : 'green' }} onClick={handleStartRecognition}>
                {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <div>
                <p>Prompt: {recognizedText}</p>
                <p>Response: {generatedMessages}</p>
            </div>
        </div>
    );
};


export default App;