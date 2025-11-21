import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { generateProfessionalSummary } from '../../services/geminiService';
import { Sparkles, Plus, X, ArrowRight } from 'lucide-react';

interface Props {
  data: ResumeData;
  jobPurpose: string;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
}

export const SkillsForm: React.FC<Props> = ({ data, jobPurpose, onChange, onNext }) => {
  const [currentSkill, setCurrentSkill] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const addSkill = () => {
    if (currentSkill.trim() && !data.skills.includes(currentSkill.trim())) {
      onChange({ ...data, skills: [...data.skills, currentSkill.trim()] });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s !== skillToRemove) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleAISummary = async () => {
    setIsGenerating(true);
    const summary = await generateProfessionalSummary(jobPurpose, data.skills);
    onChange({ ...data, summary });
    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Skills & Summary</h2>
      <p className="text-slate-500 mb-6">Add skills to help the AI craft your professional summary.</p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
        <div className="flex gap-2 mb-4">
          <input
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React, Project Management, Python"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {data.skills.map((skill) => (
            <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
              {skill}
              <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-2">Professional Summary</label>
        <div className="relative">
          <textarea
            value={data.summary}
            onChange={(e) => onChange({...data, summary: e.target.value})}
            className="w-full p-4 border border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Write a brief summary about yourself..."
          />
          <button
            onClick={handleAISummary}
            disabled={isGenerating}
            className="absolute bottom-4 right-4 flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-70"
          >
            {isGenerating ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <>
                <Sparkles className="w-3 h-3 mr-1.5" /> AI Generate
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 italic">
          Tip: Add skills first, then click "AI Generate" to create a tailored summary for a {jobPurpose}.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Next <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};