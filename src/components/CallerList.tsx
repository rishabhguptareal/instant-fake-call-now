
import { Button } from '@/components/ui/button';

interface CallerListProps {
  selectedCaller: string;
  onCallerSelect: (caller: string) => void;
  onStartCall: () => void;
}

const presetCallers = [
  { name: 'Mom', emoji: '👩‍🦳' },
  { name: 'Dad', emoji: '👨‍🦲' },
  { name: 'Wife', emoji: '👩‍❤️‍👨' },
  { name: 'Husband', emoji: '👨‍❤️‍👩' },
  { name: 'Boss', emoji: '👔' },
  { name: 'Jake', emoji: '👨' },
  { name: 'Sarah', emoji: '👩' },
  { name: 'Doctor', emoji: '👨‍⚕️' },
  { name: 'Emergency', emoji: '🚨' },
  { name: 'Unknown', emoji: '❓' },
];

const CallerList = ({ selectedCaller, onCallerSelect, onStartCall }: CallerListProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Choose Your Caller</h2>
        <div className="grid grid-cols-2 gap-3">
          {presetCallers.map((caller) => (
            <button
              key={caller.name}
              onClick={() => onCallerSelect(caller.name)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedCaller === caller.name
                  ? 'border-green-400 bg-green-400/20 text-white'
                  : 'border-white/30 bg-white/5 text-gray-300 hover:border-white/50 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-1">{caller.emoji}</div>
              <div className="text-sm font-medium">{caller.name}</div>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={onStartCall}
        disabled={!selectedCaller}
        className={`w-full h-16 text-xl font-bold rounded-2xl transition-all duration-200 ${
          selectedCaller
            ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        {selectedCaller ? `📞 Call Me Now` : 'Select a Caller First'}
      </Button>
    </div>
  );
};

export default CallerList;
