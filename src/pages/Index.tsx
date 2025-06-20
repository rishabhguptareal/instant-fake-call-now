
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800 text-center">
          <div className="text-6xl mb-4">✓</div>
          <p className="text-xl font-medium">Call Ended</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-2xl">📞</div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">Call Me Now</h1>
          <p className="text-gray-600 leading-relaxed">Fake a call to escape awkward situations</p>
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
