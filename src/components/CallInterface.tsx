import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface CallInterfaceProps {
  callerName: string;
  onEndCall: () => void;
}

const CallInterface = ({ callerName, onEndCall }: CallInterfaceProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    // Stop ringtone if playing
    const audio = new window.Audio('/apple_ringtone.mp3');
    audio.pause();
    audio.currentTime = 0;

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
    <div className="min-h-screen bg-black flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-4 text-white text-sm">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          </div>
          <span className="ml-2 text-xs">Carrier</span>
        </div>
        <div className="font-mono text-sm">12:34</div>
        <div className="flex items-center space-x-1">
          <span className="text-xs">100%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-full h-full bg-green-400 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Call Status */}
      <div className="flex justify-center items-center pt-4">
        <div className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">{formatDuration(callDuration)}</span>
        </div>
      </div>

      {/* Caller Info */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-8 shadow-2xl border-4 border-gray-700">
          <div className="text-6xl">{getCallerEmoji(callerName)}</div>
        </div>
        
        <h1 className="text-3xl font-light text-white mb-2">{callerName}</h1>
        <p className="text-lg text-gray-300 mb-1">mobile</p>
        <p className="text-sm text-green-400">Call in progress</p>
      </div>

      {/* Call Controls */}
      <div className="pb-12 px-8">
        <div className="flex justify-center space-x-16 mb-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              isMuted ? 'bg-red-600' : 'bg-gray-700'
            } transition-colors`}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </button>
          
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              isSpeakerOn ? 'bg-blue-600' : 'bg-gray-700'
            } transition-colors`}
          >
            {isSpeakerOn ? (
              <Volume2 className="w-5 h-5 text-white" />
            ) : (
              <VolumeX className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onEndCall}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallInterface;
