import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import Footer from "../components/Footer";
import { FiCopy, FiDownload } from "react-icons/fi";

const FileViewer = () => {
  const { shortId } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFile = async () => {
    try {
      const res = await API.get(`/v1/files/${shortId}`);
      setFile(res.data.file);
    } catch (err) {
      setError("This file link is invalid or has been removed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const url = `${window.location.origin}/f/${shortId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchFile();
  }, [shortId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading file...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-xl rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{file.filename}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {(file.size / 1024 / 1024).toFixed(2)} MB &middot; {file.type}
          </p>

          <a
  href={file.url}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition"
>
  <FiDownload /> View / Download
</a>


          <div className="mt-6 text-left">
            <p className="text-sm text-gray-600 mb-1">Shareable Link:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/f/${shortId}`}
                className="flex-1 text-xs px-3 py-1.5 border rounded bg-gray-50"
              />
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded"
              >
                <FiCopy />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">Downloads: {file.downloaded}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FileViewer;
