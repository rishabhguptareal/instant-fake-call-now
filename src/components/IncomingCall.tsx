
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
    // Start ringing animation
    setIsRinging(true);
    
    // Create and play ringtone
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playRingtone = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    };

    const ringtoneInterval = setInterval(playRingtone, 2000);
    playRingtone(); // Play immediately

    return () => {
      clearInterval(ringtoneInterval);
      audioContext.close();
    };
  }, []);

  const getCallerEmoji = (name: string) => {
    const emojiMap: { [key: string]: string } = {
      'Mom': '👩‍🦳',
      'Dad': '👨‍🦲',
      'Wife': '👩‍❤️‍👨',
      'Husband': '👨‍❤️‍👩',
      'Boss': '👔',
      'Jake': '👨',
      'Sarah': '👩',
      'Doctor': '👨‍⚕️',
      'Emergency': '🚨',
      'Unknown': '❓',
    };
    return emojiMap[name] || '👤';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Status bar */}
      <div className="relative z-10 flex justify-between items-center p-4 text-white text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          <span className="ml-2">Carrier</span>
        </div>
        <div className="font-mono">12:34</div>
        <div className="flex items-center space-x-1">
          <span>100%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-full h-full bg-green-400 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Incoming call text */}
      <div className="relative z-10 text-center pt-8">
        <p className="text-white/80 text-lg">Incoming call</p>
      </div>

      {/* Caller info */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <div className={`transition-transform duration-1000 ${isRinging ? 'animate-pulse' : ''}`}>
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mb-8 shadow-2xl">
            <div className="text-8xl">{getCallerEmoji(callerName)}</div>
          </div>
        </div>
        
        <h1 className="text-4xl font-light text-white mb-2">{callerName}</h1>
        <p className="text-xl text-gray-300">mobile</p>
      </div>

      {/* Action buttons */}
      <div className="relative z-10 flex justify-between items-center px-16 pb-16">
        <Button
          onClick={onDecline}
          className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 border-4 border-white/20 shadow-2xl"
        >
          <PhoneOff className="w-8 h-8 text-white" />
        </Button>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="text-white/60 text-sm">Slide to answer</div>
          <div className="w-16 h-1 bg-white/30 rounded-full" />
        </div>
        
        <Button
          onClick={onAnswer}
          className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 border-4 border-white/20 shadow-2xl animate-bounce"
        >
          <Phone className="w-8 h-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default IncomingCall;
