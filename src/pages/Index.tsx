import { useState } from 'react';
import IncomingCall from '@/components/IncomingCall';
import CallInterface from '@/components/CallInterface';

export type CallState = 'idle' | 'ringing' | 'answered' | 'ended';

const presetCallers = [
  { name: 'mom' },
  { name: 'wife' },
  { name: 'jake' },
];

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-xs mx-auto p-6 rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-center text-xl font-semibold mb-8">choose name</h2>
        <div className="flex justify-center gap-3 mb-8">
          {presetCallers.map((caller) => (
            <button
              key={caller.name}
              onClick={() => handleCallerSelect(caller.name)}
              className={`px-6 py-2 rounded-full border text-base font-medium transition-all duration-150 ${
                selectedCaller === caller.name
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {caller.name}
            </button>
          ))}
        </div>
        <button
          onClick={handleStartCall}
          disabled={!selectedCaller}
          className={`w-full py-4 rounded-lg text-lg font-bold transition-all duration-150 mb-6 ${
            selectedCaller
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          call me asap
        </button>
        <div className="text-center text-xs text-gray-400 mt-8">fakephonecall.com</div>
      </div>
    </div>
  );
};

export default Index;
