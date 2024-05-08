import React, { useEffect } from 'react';
import { setupSpeechRecognition, startSpeechRecognition } from './utils/speechRecognition';

const App = () => {
    const [recognizedText, setRecognizedText] = React.useState('');
    const [isListening, setIsListening] = React.useState(false);
    const [textHistory, setTextHistory] = React.useState([]);

    useEffect(() => {
        setupSpeechRecognition(updateRecognizedText, setIsListening);
    }, []);

    const updateRecognizedText = (text) => {
        setRecognizedText(text);
        setTextHistory(prevHistory => [...prevHistory, text]);
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
            <p>Recognized Text: {recognizedText}</p>
            <div>
                <h2>Text History:</h2>
                <ul>
                    {textHistory.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;