import React from 'react';
import { ResumeStyle } from '../../types';
import { Layout, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  selected: ResumeStyle;
  onSelect: (style: ResumeStyle) => void;
  onNext: () => void;
}

export const StyleSelection: React.FC<Props> = ({ selected, onSelect, onNext }) => {
  const styles = [
    {
      id: ResumeStyle.MODERN,
      name: 'Modern',
      description: 'A sleek design with a colored sidebar, perfect for tech and creative roles.',
      color: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: ResumeStyle.CLASSIC,
      name: 'Classic',
      description: 'Traditional, serif-font layout. Ideal for corporate, legal, and academic roles.',
      color: 'bg-slate-50',
      border: 'border-slate-200'
    },
    {
      id: ResumeStyle.MINIMALIST,
      name: 'Minimalist',
      description: 'Clean lines and ample whitespace. Focuses purely on the content.',
      color: 'bg-emerald-50',
      border: 'border-emerald-200'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose a Style</h2>
      <p className="text-slate-500 mb-6">Select a template that best fits your industry and personality.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
              selected === style.id 
                ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            {selected === style.id && (
              <div className="absolute top-3 right-3 text-blue-600">
                <CheckCircle2 className="w-6 h-6 fill-blue-100" />
              </div>
            )}
            <div className="w-12 h-12 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4">
              <Layout className={`w-6 h-6 ${selected === style.id ? 'text-blue-600' : 'text-slate-400'}`} />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-slate-800">{style.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{style.description}</p>
          </div>
        ))}
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