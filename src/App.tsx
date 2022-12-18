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
    <div className="flex">
      <div className="w-1/2 p-4">
        <textarea onChange={handleChange} value={markdown} className="w-full h-full p-4 rounded-lg" />
      </div>
      <div className="w-1/2 p-4">
        <ReactMarkdown children={markdown} className="w-full h-full p-4 rounded-lg" />
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <button onClick={handleDownloadMarkdown} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
          Download Markdown
        </button>
        <button onClick={handleDownloadPDF} className="px-4 py-2 rounded-lg bg-blue-500 text-white ml-4">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default App;
