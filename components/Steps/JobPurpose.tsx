import React, { useState } from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

export const JobPurpose: React.FC<Props> = ({ value, onChange, onNext }) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!value.trim()) {
      setError('Please enter a job title or purpose.');
      return;
    }
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Target Job Role</h2>
      <p className="text-slate-500 mb-6">What is the primary job title or purpose for this resume?</p>
      
      <div className="relative mb-2">
        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setError('');
          }}
          placeholder="e.g. Senior Software Engineer"
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          autoFocus
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="flex items-center px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Next <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};