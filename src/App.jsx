import React, { useEffect } from 'react';
import { setupSpeechRecognition, startSpeechRecognition } from './utils/speechRecognition';

const App = () => {
    useEffect(() => {
        setupSpeechRecognition();
    }, []);

    const handleStartRecognition = () => {
        startSpeechRecognition();
    };

    return (
        <div>
            <h1>Voice to Text</h1>
            <button onClick={handleStartRecognition}>Start Listening</button>
        </div>
    );
};

export default App;