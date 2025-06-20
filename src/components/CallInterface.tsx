
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PhoneOff } from 'lucide-react';

interface CallInterfaceProps {
  callerName: string;
  onEndCall: () => void;
}

const CallInterface = ({ callerName, onEndCall }: CallInterfaceProps) => {
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);

    return () => {
      clearInterval(interval);
      audioContext.close();
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex justify-between items-center p-4 text-white text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400">Connected</span>
        </div>
        <div className="font-mono">{formatDuration(callDuration)}</div>
        <div className="flex items-center space-x-1">
          <span>100%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-full h-full bg-green-400 rounded-sm"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <div className="text-4xl">{getCallerEmoji(callerName)}</div>
        </div>
        
        <h1 className="text-2xl font-light text-white mb-2">{callerName}</h1>
        <p className="text-lg text-green-300 mb-2">{formatDuration(callDuration)}</p>
        <p className="text-gray-400 text-sm">Call in progress</p>

        <div className="mt-8 text-center max-w-xs">
          <div className="bg-gray-800 rounded-lg p-3 mb-3">
            <p className="text-white/80 text-sm">"Hello, how are you?"</p>
          </div>
          <div className="bg-green-600 rounded-lg p-3">
            <p className="text-white text-sm">"I'm doing well, thanks!"</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-12">
        <Button
          onClick={onEndCall}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
        >
          <PhoneOff className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default CallInterface;
