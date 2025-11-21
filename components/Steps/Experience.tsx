import React from 'react';
import { ResumeData, Experience } from '../../types';
import { Plus, Trash2, ArrowRight, Briefcase } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
}

export const ExperienceForm: React.FC<Props> = ({ data, onChange, onNext }) => {
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      duration: '',
      description: ''
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updated = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Work Experience</h2>
      <p className="text-slate-500 mb-6">Add your relevant work history. Start with the most recent.</p>

      <div className="space-y-6 mb-8">
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-700 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                Position {index + 1}
              </h3>
              <button onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                placeholder="Job Title"
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              />
              <input
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              />
              <input
                placeholder="Duration (e.g. Jan 2020 - Present)"
                value={exp.duration}
                onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white col-span-2"
              />
              <textarea
                placeholder="Key responsibilities and achievements..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white col-span-2 h-24 resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addExperience}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center font-medium"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Experience
        </button>
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