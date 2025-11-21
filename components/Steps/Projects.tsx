
import React, { useState } from 'react';
import { ResumeData, Project } from '../../types';
import { Plus, Trash2, ArrowRight, FolderGit2, AlertCircle } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
}

export const ProjectsForm: React.FC<Props> = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateUrl = (url: string) => {
    if (!url) return true; // Empty is allowed (optional)
    // Regex for standard URL validation (with or without http/https)
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    return pattern.test(url);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      link: '',
      description: ''
    };
    onChange({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = data.projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onChange({ ...data, projects: updated });

    // Real-time validation for link field
    if (field === 'link') {
      if (value && !validateUrl(value)) {
        setErrors(prev => ({ ...prev, [id]: 'Invalid URL format' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[id];
          return newErrors;
        });
      }
    }
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(proj => proj.id !== id) });
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleNext = () => {
    // Validate all projects before proceeding
    const newErrors: Record<string, string> = {};
    let hasError = false;

    data.projects.forEach(proj => {
      if (proj.link && !validateUrl(proj.link)) {
        newErrors[proj.id] = 'Invalid URL format';
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Projects</h2>
      <p className="text-slate-500 mb-6">Showcase relevant projects, assignments, or portfolio work.</p>

      <div className="space-y-6 mb-8">
        {data.projects.map((proj, index) => (
          <div key={proj.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-700 flex items-center">
                <FolderGit2 className="w-4 h-4 mr-2 text-blue-500" />
                Project {index + 1}
              </h3>
              <button onClick={() => removeProject(proj.id)} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              />
              
              <div className="relative">
                <input
                  placeholder="Link / URL (Optional)"
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none bg-white transition-colors ${
                    errors[proj.id] 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'focus:ring-blue-500 border-slate-200'
                  }`}
                />
                {errors[proj.id] && (
                  <div className="absolute right-3 top-3 text-red-500 pointer-events-none">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}
                {errors[proj.id] && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors[proj.id]}</p>
                )}
              </div>

              <textarea
                placeholder="Description of the project, technologies used, and your role..."
                value={proj.description}
                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white md:col-span-2 h-24 resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addProject}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center font-medium"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Project
        </button>
      </div>

      <div className="flex justify-end">
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
