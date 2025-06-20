
import { Button } from '@/components/ui/button';

interface CallerListProps {
  selectedCaller: string;
  onCallerSelect: (caller: string) => void;
  onStartCall: () => void;
}

const presetCallers = [
  { name: 'Mom', emoji: '👩' },
  { name: 'Work', emoji: '💼' },
  { name: 'Friend', emoji: '👋' },
  { name: 'Doctor', emoji: '👨‍⚕️' },
];

const CallerList = ({ selectedCaller, onCallerSelect, onStartCall }: CallerListProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Choose contact</h2>
        <div className="space-y-3">
          {presetCallers.map((caller) => (
            <button
              key={caller.name}
              onClick={() => onCallerSelect(caller.name)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                selectedCaller === caller.name
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                {caller.emoji}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{caller.name}</div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
              {selectedCaller === caller.name && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={onStartCall}
        disabled={!selectedCaller}
        className={`w-full h-14 text-lg font-medium rounded-xl transition-all duration-200 ${
          selectedCaller
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
        }`}
      >
        {selectedCaller ? 'Start Call' : 'Select a contact first'}
      </Button>
    </div>
  );
};

export default CallerList;
