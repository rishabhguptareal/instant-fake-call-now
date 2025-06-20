
import { useState } from 'react';
import CallerList from '@/components/CallerList';
import IncomingCall from '@/components/IncomingCall';
import CallInterface from '@/components/CallInterface';

export type CallState = 'idle' | 'ringing' | 'answered' | 'ended';

const Index = () => {
  const [selectedCaller, setSelectedCaller] = useState<string>('');
  const [callState, setCallState] = useState<CallState>('idle');

  const handleCallerSelect = (caller: string) => {
    setSelectedCaller(caller);
  };

  const handleStartCall = () => {
    if (selectedCaller) {
      setCallState('ringing');
    }
  };

  const handleAnswerCall = () => {
    setCallState('answered');
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      setCallState('idle');
      setSelectedCaller('');
    }, 1000);
  };

  if (callState === 'ringing') {
    return (
      <IncomingCall
        callerName={selectedCaller}
        onAnswer={handleAnswerCall}
        onDecline={handleEndCall}
      />
    );
  }

  if (callState === 'answered') {
    return (
      <CallInterface
        callerName={selectedCaller}
        onEndCall={handleEndCall}
      />
    );
  }

  if (callState === 'ended') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">📞</div>
          <p className="text-xl">Call Ended</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="text-6xl mb-4">📞</div>
          <h1 className="text-3xl font-bold text-white mb-2">Fake Call</h1>
          <p className="text-gray-300">Need an instant escape? Get a fake call now!</p>
        </div>

        <CallerList
          selectedCaller={selectedCaller}
          onCallerSelect={handleCallerSelect}
          onStartCall={handleStartCall}
        />
      </div>
    </div>
  );
};

export default Index;
