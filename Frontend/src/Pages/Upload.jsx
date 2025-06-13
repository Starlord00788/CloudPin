import { useState } from "react";
import API from "../api/axios";
import Footer from "../components/Footer.jsx";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setDownloadUrl("");
  };

 const handleUpload = async (e) => {
  e.preventDefault();

  if (!file) {
    setError("Please select a file to upload.");
    return;
  }

  // 🛑 Block PDFs
  if (file.type === "application/pdf") {
    setError("PDF uploads are not supported.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);
    const res = await API.post("/v1/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setDownloadUrl(res.data.downloadUrl);
  } catch (err) {
    setError(err.response?.data?.message || "Upload failed");
  } finally {
    setUploading(false);
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadUrl);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-xl mx-auto mt-16 px-6 py-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Upload a File
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="file"
              onChange={handleChange}
              accept="*"
              className="block w-full text-sm border border-gray-300 rounded p-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-600 file:text-white file:rounded-lg hover:file:bg-blue-700 transition"
            />

            {file && (
              <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {file.name}
                </p>
                <p>
                  <strong>Size:</strong>{" "}
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p>
                  <strong>Type:</strong> {file.type || "unknown"}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>

          {downloadUrl && (
            <div className="mt-6 p-4 border border-green-400 bg-green-50 rounded text-sm text-green-800">
              <p className="font-medium mb-2">Your download link:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={downloadUrl}
                  className="w-full px-3 py-1.5 border rounded text-xs bg-white"
                />
                <button
                  onClick={handleCopy}
                  className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Upload;
