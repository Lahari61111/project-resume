
import React, { useState } from 'react';
import { LandingPage } from './components/Steps/LandingPage';
import { JobPurpose } from './components/Steps/JobPurpose';
import { StyleSelection } from './components/Steps/StyleSelection';
import { PersonalInfo } from './components/Steps/PersonalInfo';
import { ExperienceForm } from './components/Steps/Experience';
import { EducationForm } from './components/Steps/Education';
import { ProjectsForm } from './components/Steps/Projects';
import { SkillsForm } from './components/Steps/Skills';
import { PhotoUpload } from './components/Steps/PhotoUpload';
import { ResumePreview } from './components/ResumePreview';
import { DownloadScreen } from './components/Steps/Download';
import { AppStep, ResumeData, ResumeStyle } from './types';
import { Check, X } from 'lucide-react';

const initialData: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
  photo: null
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [jobPurpose, setJobPurpose] = useState('');
  const [style, setStyle] = useState<ResumeStyle>(ResumeStyle.MODERN);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  const renderStep = () => {
    switch (step) {
      case AppStep.LANDING:
        return <LandingPage onStart={nextStep} />;
      case AppStep.JOB_PURPOSE:
        return <JobPurpose value={jobPurpose} onChange={setJobPurpose} onNext={nextStep} />;
      case AppStep.STYLE_SELECTION:
        return <StyleSelection selected={style} onSelect={setStyle} onNext={nextStep} />;
      case AppStep.PERSONAL_INFO:
        return <PersonalInfo data={resumeData} onChange={setResumeData} onNext={nextStep} />;
      case AppStep.EXPERIENCE:
        return <ExperienceForm data={resumeData} onChange={setResumeData} onNext={nextStep} />;
      case AppStep.EDUCATION:
        return <EducationForm data={resumeData} onChange={setResumeData} onNext={nextStep} />;
      case AppStep.PROJECTS:
        return <ProjectsForm data={resumeData} onChange={setResumeData} onNext={nextStep} />;
      case AppStep.SKILLS:
        return <SkillsForm data={resumeData} jobPurpose={jobPurpose} onChange={setResumeData} onNext={nextStep} />;
      case AppStep.PHOTO_UPLOAD:
        return <PhotoUpload data={resumeData} onChange={setResumeData} onNext={nextStep} />;
      case AppStep.PREVIEW_VERIFICATION:
        return (
            <div className="flex flex-col items-center">
                 <h2 className="text-3xl font-bold text-slate-800 mb-4">Review Your Resume</h2>
                 <p className="text-slate-500 mb-8">Is this resume good to go?</p>
                 
                 {/* Preview Container - Scaled down for UI view */}
                 <div className="transform scale-[0.6] origin-top h-[180mm] border shadow-2xl overflow-y-auto overflow-x-hidden mb-8 bg-gray-100 rounded-lg">
                    <div className="pointer-events-none">
                        <ResumePreview data={resumeData} style={style} jobPurpose={jobPurpose} />
                    </div>
                 </div>

                 <div className="flex gap-4 fixed bottom-8 z-50 bg-white/90 p-4 rounded-full shadow-lg backdrop-blur-sm border border-slate-200">
                     <button 
                        onClick={() => setStep(AppStep.PERSONAL_INFO)}
                        className="flex items-center px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-full hover:bg-slate-200 transition-colors"
                     >
                        <X className="w-5 h-5 mr-2" /> Edit / No
                     </button>
                     <button 
                        onClick={nextStep}
                        className="flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-200"
                     >
                        <Check className="w-5 h-5 mr-2" /> Yes, Proceed
                     </button>
                 </div>
            </div>
        );
      case AppStep.DOWNLOAD:
        return (
            <div className="flex flex-col items-center">
                <DownloadScreen onRestart={() => setStep(AppStep.LANDING)} />
                {/* Hidden preview for rendering PDF */}
                <div className="absolute left-[-9999px] top-0">
                    <ResumePreview data={resumeData} style={style} jobPurpose={jobPurpose} />
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Header / Progress Bar */}
      {step > AppStep.LANDING && step < AppStep.DOWNLOAD && (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight">ProResuMe</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">AI</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-slate-500">
                    Step {step} of 9
                </div>
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 9) * 100}%` }}
                    />
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`max-w-6xl mx-auto p-6 ${step === AppStep.PREVIEW_VERIFICATION ? 'pb-32' : ''}`}>
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
             {renderStep()}
        </div>
      </main>
    </div>
  );
};

export default App;
