
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff } from 'lucide-react';

interface IncomingCallProps {
  callerName: string;
  onAnswer: () => void;
  onDecline: () => void;
}

const IncomingCall = ({ callerName, onAnswer, onDecline }: IncomingCallProps) => {
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    setIsRinging(true);
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playRingtone = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    };

    const ringtoneInterval = setInterval(playRingtone, 2500);
    playRingtone();

    return () => {
      clearInterval(ringtoneInterval);
      audioContext.close();
    };
  }, []);

  const getCallerEmoji = (name: string) => {
    const emojiMap: { [key: string]: string } = {
      'Mom': '👩',
      'Work': '💼',
      'Friend': '👋',
      'Doctor': '👨‍⚕️',
    };
    return emojiMap[name] || '👤';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative">
      <div className="flex justify-between items-center p-4 text-white text-sm">
        <div>●●● Signal</div>
        <div className="font-mono">12:34</div>
        <div className="flex items-center space-x-1">
          <span>100%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-full h-full bg-green-400 rounded-sm"></div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 text-white">
        <p className="text-lg opacity-80">Incoming call</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className={`transition-transform duration-1000 ${isRinging ? 'animate-pulse' : ''}`}>
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-8 shadow-lg">
            <div className="text-6xl">{getCallerEmoji(callerName)}</div>
          </div>
        </div>
        
        <h1 className="text-3xl font-light text-white mb-2">{callerName}</h1>
        <p className="text-lg text-gray-300">mobile</p>
      </div>

      <div className="flex justify-between items-center px-16 pb-12">
        <Button
          onClick={onDecline}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
        >
          <PhoneOff className="w-6 h-6 text-white" />
        </Button>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white/60 text-sm">swipe to answer</div>
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>
        
        <Button
          onClick={onAnswer}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg animate-bounce"
        >
          <Phone className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default IncomingCall;
