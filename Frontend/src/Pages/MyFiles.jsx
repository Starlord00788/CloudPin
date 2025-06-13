import { useEffect, useState } from "react";
import API from "../api/axios";
import Footer from "../components/Footer";
import { FiTrash2, FiCopy, FiEye } from "react-icons/fi";

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await API.get("/v1/files/my");
      setFiles(res.data.files || []);
    } catch (err) {
      console.error("Failed to fetch files");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirm) return;

    try {
      await API.delete(`/v1/files/${id}`);
      setFiles((prev) => prev.filter((file) => file._id !== id));
    } catch (err) {
      console.error("Failed to delete");
    }
  };

  const handleCopy = (shortId) => {
    const link = `${window.location.origin}/f/${shortId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(shortId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col  ">
      <main className="flex-grow max-w-6xl mx-auto px-4 pt-16 pb-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Uploaded Files
        </h2>

        {files.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No files uploaded yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-5 py-3">Filename</th>
                  <th className="px-5 py-3">Size</th>
                  <th className="px-5 py-3">Downloads</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">{file.filename}</td>
                    <td className="px-5 py-3">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td className="px-5 py-3">{file.downloaded}</td>
                    <td className="px-5 py-3 flex flex-wrap justify-center gap-3">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition text-sm"
                      >
                        <FiEye /> View
                      </a>

                      <button
                        onClick={() => handleCopy(file.shortId)}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800 transition text-sm"
                      >
                        <FiCopy />
                        {copiedId === file.shortId ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={() => handleDelete(file._id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 transition text-sm"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyFiles;
