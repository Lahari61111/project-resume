
import React from 'react';
import { ResumeData, ResumeStyle } from '../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
  jobPurpose: string;
}

export const ResumePreview: React.FC<Props> = ({ data, style, jobPurpose }) => {
  
  // --- MODERN STYLE ---
  if (style === ResumeStyle.MODERN) {
    return (
      <div id="resume-preview" className="a4-paper flex text-slate-800 font-sans">
        {/* Sidebar */}
        <div className="w-1/3 bg-slate-900 text-white p-8 flex flex-col h-full">
          <div className="mb-8 text-center">
            {data.photo && (
              <img 
                src={data.photo} 
                alt={data.fullName} 
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-slate-700 mb-4"
              />
            )}
            <h1 className="text-2xl font-bold leading-tight mb-2">{data.fullName}</h1>
            <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">{jobPurpose}</p>
          </div>

          <div className="space-y-4 mb-8 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="break-all">{data.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{data.address}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4 text-white">Education</h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-white">{edu.school}</p>
                  <p className="text-sm text-slate-400">{edu.degree}</p>
                  <p className="text-xs text-slate-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold border-b border-slate-700 pb-2 mb-4 text-white">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8 bg-white">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide border-b-2 border-blue-500 pb-2 mb-4">Profile</h2>
            <p className="text-slate-600 leading-relaxed text-sm text-justify">
              {data.summary}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide border-b-2 border-blue-500 pb-2 mb-6">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                    <span className="text-sm text-slate-500 italic">{exp.duration}</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {data.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide border-b-2 border-blue-500 pb-2 mb-6">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-slate-800">{proj.name}</h3>
                      {proj.link && <span className="text-xs text-blue-500 italic truncate max-w-[200px]">{proj.link}</span>}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- CLASSIC STYLE ---
  if (style === ResumeStyle.CLASSIC) {
    return (
      <div id="resume-preview" className="a4-paper p-12 text-slate-900 font-serif">
        <div className="text-center mb-8 border-b-2 border-slate-800 pb-6">
          <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide">{data.fullName}</h1>
          <p className="text-lg text-slate-600 mb-4 font-sans">{jobPurpose}</p>
          <div className="flex justify-center gap-4 text-sm font-sans text-slate-600">
            <span>{data.email}</span>
            <span>•</span>
            <span>{data.phone}</span>
            <span>•</span>
            <span>{data.address}</span>
          </div>
        </div>

        {data.photo && (
            <div className="absolute top-12 right-12 hidden print:hidden"> 
               <img src={data.photo} className="w-24 h-24 object-cover border border-slate-300" alt="User"/>
            </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-3">Professional Summary</h3>
          <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4">Experience</h3>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold">
                  <span>{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic mb-1">{exp.role}</div>
                <p className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {data.projects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4">Key Projects</h3>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold">{proj.name}</span>
                    {proj.link && <span className="text-xs text-slate-500 italic">{proj.link}</span>}
                  </div>
                  <p className="text-sm leading-relaxed mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4">Education</h3>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold block">{edu.school}</span>
                  <span className="italic text-sm">{edu.degree}</span>
                </div>
                <span className="text-sm">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-3">Skills</h3>
          <p className="text-sm leading-relaxed">
            {data.skills.join(' • ')}
          </p>
        </div>
      </div>
    );
  }

  // --- MINIMALIST STYLE ---
  return (
    <div id="resume-preview" className="a4-paper p-10 text-slate-800 font-display bg-white">
      <div className="flex items-start justify-between mb-12">
        <div>
          <h1 className="text-5xl font-light text-slate-900 mb-2 tracking-tight">{data.fullName}</h1>
          <p className="text-xl text-slate-500 font-light">{jobPurpose}</p>
        </div>
        <div className="text-right text-sm text-slate-500 font-light space-y-1">
           <p>{data.email}</p>
           <p>{data.phone}</p>
           <p>{data.address}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-8">
           {data.photo && (
             <img src={data.photo} className="w-32 h-32 object-cover rounded-lg grayscale opacity-90" alt="User"/>
           )}
           
           <div>
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Education</h3>
             <div className="space-y-4">
                {data.education.map(edu => (
                    <div key={edu.id}>
                        <p className="font-semibold">{edu.school}</p>
                        <p className="text-sm text-slate-500">{edu.degree}</p>
                        <p className="text-xs text-slate-400 mt-1">{edu.year}</p>
                    </div>
                ))}
             </div>
           </div>

           <div>
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Expertise</h3>
             <div className="flex flex-col gap-2">
                {data.skills.map(skill => (
                    <span key={skill} className="text-sm text-slate-600 border-l-2 border-slate-200 pl-2">{skill}</span>
                ))}
             </div>
           </div>
        </div>

        <div className="col-span-8 space-y-10">
           <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">About</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                  {data.summary}
              </p>
           </div>

           <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Experience</h3>
              <div className="space-y-8 border-l border-slate-200 pl-6 ml-2">
                 {data.experience.map(exp => (
                     <div key={exp.id} className="relative">
                         <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                         <h4 className="text-lg font-medium text-slate-800">{exp.role}</h4>
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-600">{exp.company}</span>
                            <span className="text-xs text-slate-400">{exp.duration}</span>
                         </div>
                         <p className="text-sm text-slate-500 leading-relaxed font-light">{exp.description}</p>
                     </div>
                 ))}
              </div>
           </div>

           {data.projects.length > 0 && (
             <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Selected Projects</h3>
                <div className="space-y-6 border-l border-slate-200 pl-6 ml-2">
                   {data.projects.map(proj => (
                       <div key={proj.id} className="relative">
                           <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                           <div className="flex justify-between items-center mb-1">
                              <h4 className="text-lg font-medium text-slate-800">{proj.name}</h4>
                              {proj.link && <span className="text-xs text-slate-400 font-light">{proj.link}</span>}
                           </div>
                           <p className="text-sm text-slate-500 leading-relaxed font-light">{proj.description}</p>
                       </div>
                   ))}
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
