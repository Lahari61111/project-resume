import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-blue-100">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 rounded-full">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 font-display">
          Build Your Professional Resume
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Create a standout resume in minutes. Our AI-guided process helps you craft a professional CV tailored to your dream job. 
          Select a style, input your details, and download your PDF.
        </p>
        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Start Building Now
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};