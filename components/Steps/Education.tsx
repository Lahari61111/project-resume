import React from 'react';
import { ResumeData, Education } from '../../types';
import { Plus, Trash2, ArrowRight, GraduationCap } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
}

export const EducationForm: React.FC<Props> = ({ data, onChange, onNext }) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      year: ''
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(edu => edu.id !== id) });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Education</h2>
      <p className="text-slate-500 mb-6">List your academic background.</p>

      <div className="space-y-6 mb-8">
        {data.education.map((edu, index) => (
          <div key={edu.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-700 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                School {index + 1}
              </h3>
              <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="School / University"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              />
              <input
                placeholder="Degree / Major"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              />
              <input
                placeholder="Graduation Year"
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white md:col-span-2"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addEducation}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center font-medium"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Education
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