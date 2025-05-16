// components/VoiceInput.tsx
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface VoiceInputProps {
    onResult: (transcript: string) => void;
    disabled?: boolean;
}

export const VoiceInput = ({ onResult, disabled }: VoiceInputProps) => {
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setSpeechSupported(true);
        }
    }, []);

    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.continuous = false;

        setIsListening(true);

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    if (!speechSupported) return null;

    return (
        <Button
            className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
            onClick={startListening}
            disabled={isListening || disabled}
            title="Speak your symptoms"
        >
            🗣️
        </Button>
    );
};
