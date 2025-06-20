
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

    // Play a brief "hello" tone when call starts
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-800 flex flex-col">
      {/* Status bar */}
      <div className="flex justify-between items-center p-4 text-white text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <span className="ml-2 text-green-400">On Call</span>
        </div>
        <div className="font-mono">{formatDuration(callDuration)}</div>
        <div className="flex items-center space-x-1">
          <span>100%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-full h-full bg-green-400 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Caller info */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center mb-8 shadow-2xl">
          <div className="text-6xl">{getCallerEmoji(callerName)}</div>
        </div>
        
        <h1 className="text-3xl font-light text-white mb-2">{callerName}</h1>
        <p className="text-lg text-green-300 mb-4">{formatDuration(callDuration)}</p>
        <p className="text-gray-400">Connected</p>

        {/* Fake conversation prompts */}
        <div className="mt-12 text-center max-w-sm">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
            <p className="text-white/80 text-sm">💬 "Hey, can you talk right now?"</p>
          </div>
          <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-green-200 text-sm">📞 Perfect timing for your escape!</p>
          </div>
        </div>
      </div>

      {/* End call button */}
      <div className="flex justify-center pb-16">
        <Button
          onClick={onEndCall}
          className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 border-4 border-white/20 shadow-2xl"
        >
          <PhoneOff className="w-8 h-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default CallInterface;
