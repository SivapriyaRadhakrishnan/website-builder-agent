import { useLocation, useNavigate } from "react-router-dom";

export default function PreviewPage() {
  console.log("PreviewPage Rendered");
  
  const navigate = useNavigate();
  const { state } = useLocation();

  const previewUrl = state?.previewUrl;
  const projectName = state?.projectName || "Generated Website";
  

console.log("Preview URL received:", previewUrl);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#111]">
        <button onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>{projectName}</h2>

        <button
          onClick={() => {
            document.getElementById("preview-frame")?.contentWindow?.location.reload();
          }}
        >
          Refresh
        </button>
      </header>

      <iframe
        id="preview-frame"
        src={previewUrl}
        className="flex-1 w-full border-0"
        title="Website Preview"
      />
    </div>
  );
}