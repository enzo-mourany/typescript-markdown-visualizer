import { useState } from 'react'
import './App.css';
import ReactMarkdown from 'react-markdown';
import { renderToString } from 'react-dom/server';
import { pdf } from '@react-pdf/renderer';

function App() {
  const [markdown, setMarkdown] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'document.md';
    document.body.appendChild(element);
    element.click();
  };

  const handleDownloadPDF = async () => {
    const element = document.createElement('a');
    const file = await pdf(renderToString(<ReactMarkdown source={markdown} />)).toBlob();
    element.href = URL.createObjectURL(file);
    element.download = 'document.pdf';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="w-1/2 p-4">
          <textarea onChange={handleChange} value={markdown} className="w-full h-full p-4 rounded-lg" />
        </div>
        <div className="w-1/2 p-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <ReactMarkdown children={markdown} className="w-full h-full p-4 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex justify-center bottom-0 right-0 p-4 gap-8">
        <button onClick={handleDownloadMarkdown} className="btn btn-outline btn-info">
          Download Markdown
        </button>
        <button onClick={handleDownloadPDF} className="btn btn-outline btn-info">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default App;
