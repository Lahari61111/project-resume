import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, CheckCircle, RefreshCw } from 'lucide-react';

interface Props {
  onRestart: () => void;
}

export const DownloadScreen: React.FC<Props> = ({ onRestart }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    const element = document.getElementById('resume-preview');
    
    if (!element) {
        setIsGenerating(false);
        return;
    }

    try {
      // Wait for images to render if any
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('My_ProResuMe.pdf');
      
      setIsDownloaded(true);
    } catch (err) {
      console.error("PDF Generation failed", err);
      alert("Sorry, something went wrong while generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isDownloaded) {
    return (
      <div className="text-center animate-fade-in p-8 bg-white rounded-2xl shadow-xl max-w-lg mx-auto border border-green-100">
        <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Thank You!</h2>
        <p className="text-slate-600 mb-8">
          Your resume has been downloaded successfully. We wish you the best of luck in your job search!
        </p>
        <button
          onClick={onRestart}
          className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Create Another Resume
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Resume is Ready!</h2>
      <p className="text-slate-600 mb-8">
        Your professional resume has been compiled. Click below to download the PDF version.
      </p>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="w-full flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 disabled:opacity-70 disabled:cursor-wait"
      >
        {isGenerating ? (
          <span className="flex items-center">Processing...</span>
        ) : (
          <span className="flex items-center">
            <Download className="w-6 h-6 mr-2" /> Download PDF
          </span>
        )}
      </button>
    </div>
  );
};