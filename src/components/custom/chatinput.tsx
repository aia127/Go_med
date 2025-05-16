import { Textarea } from "../ui/textarea";
import { cx } from 'classix';
import { Button } from "../ui/button";
import { ArrowUpIcon } from "./icons";
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { VoiceInput } from "./voiceinput";
import { FileUpload } from "./fileupload";


interface ChatInputProps {
    question: string;
    setQuestion: (question: string) => void;
    onSubmit: (text?: string) => void;
    isLoading: boolean;
}

// Message to animate when the page loads
const introMessage = "Feel free to share your symptoms with me.I am only here for to make sure you are heard.You can also book your appointment right away with your favourite doctor by writing Doctor's name,speciality,institution and location.Example I would like to book an appointment with Dr. Müller in X Hospital in Berlin, who specializes in cardiology."

export const ChatInput = ({ question, setQuestion, onSubmit, isLoading }: ChatInputProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingEffect, setIsTypingEffect] = useState(true);

    // Run typing animation once when the component mounts
    useEffect(() => {
        const typeText = async (text: string) => {
            for (let i = 0; i <= text.length; i++) {
                await new Promise((res) => setTimeout(res, 20));
                setDisplayedText(text.slice(0, i));
            }
            setIsTypingEffect(false);
        };

        typeText(introMessage);
    }, []);

    return (
        <div className="relative w-full flex flex-col gap-4">

            {/* Animated Typing Display */}
            {displayedText && (
                <div className="min-h-[24px] px-3 py-2 rounded-md text-base text-muted-foreground font-mono whitespace-pre-wrap">
                    {displayedText.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.02 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
            )}

           <div className="flex items-center gap-2">
            
   
    
    
    
</div>


            <Textarea
                placeholder="Write your symptoms"
                className={cx(
                    'min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-muted',
                )}
                value={question}
                onChange={(e) => {
                    setDisplayedText(''); // hide animated text once user starts typing
                    setQuestion(e.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();

                        if (isLoading || isTypingEffect) {
                            toast.error('Please wait for the model to finish its response!');
                        } else {
                            onSubmit();
                        }
                    }
                }}
                rows={3}
                disabled={isTypingEffect}
                autoFocus
                
            />
            <div className="absolute bottom-2 right-2 flex gap-2">
   
    <FileUpload
    disabled={isTypingEffect}
    onFilesSelected={(files) => {
      console.log('Files selected:', files);
    }}/>
    <VoiceInput
        onResult={(transcript) => {
            setDisplayedText('');
            setQuestion(transcript);
        }}
        disabled={isTypingEffect}
    />
    <Button
        className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
        onClick={() => onSubmit(question)}
        disabled={question.length === 0 || isTypingEffect}
    >
        <ArrowUpIcon size={14} />
    </Button>
</div>

            
        </div>
    );
};
