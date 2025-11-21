import React, { useRef, useState } from 'react';
import { ResumeData } from '../../types';
import { Upload, Image as ImageIcon, Trash2, ArrowRight } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
}

export const PhotoUpload: React.FC<Props> = ({ data, onChange, onNext }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('File size too large. Please upload an image under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, photo: reader.result as string });
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange({ ...data, photo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Add Your Photo</h2>
      <p className="text-slate-500 mb-6">Upload a professional headshot to verify your identity and personalize your resume.</p>

      <div className="bg-white p-8 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center mb-6 hover:border-blue-400 transition-colors">
        {data.photo ? (
          <div className="relative group">
            <img 
              src={data.photo} 
              alt="Preview" 
              className="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
            />
            <button
              onClick={removePhoto}
              className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
              title="Remove Photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-blue-500" />
            </div>
            <p className="text-lg font-medium text-slate-700 mb-1">Click to upload image</p>
            <p className="text-sm text-slate-400">SVG, PNG, JPG or GIF (max. 2MB)</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-between items-center">
        <button
          onClick={onNext}
          className="text-slate-500 hover:text-slate-700 text-sm underline"
        >
          Skip this step
        </button>

        <button
          onClick={onNext}
          className="flex items-center px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Finish & Preview <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};