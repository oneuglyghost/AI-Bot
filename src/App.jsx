import React, { useState, useEffect } from 'react';
import { setupSpeechRecognition, startSpeechRecognition } from './utils/speechRecognition';

const App = () => {
    const [recognizedText, setRecognizedText] = useState('');

    useEffect(() => {
        setupSpeechRecognition(setRecognizedText);
    }, []);

    const handleStartRecognition = () => {
        startSpeechRecognition();
    };

    return (
        <div>
            <h1>Voice to Text</h1>
            <button onClick={handleStartRecognition}>Start Listening</button>
            <p>Recognized Text: {recognizedText}</p>
        </div>
    );
};

export default App;