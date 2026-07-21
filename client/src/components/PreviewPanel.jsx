import { useBuilder } from "../hooks/useBuilder";
import { previewWebsite } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  ArrowIcon,
  CheckIcon,
  DownloadIcon,
  LayoutIcon,
  SparklesIcon,
} from "./Icons";

const getName = (result) =>
  result?.projectPlan?.projectName ||
  result?.requirements?.projectName ||
  "Generated Website";

const getPages = (result) =>
  result?.projectPlan?.pages?.length ??
  result?.frontend?.pagesGenerated ??
  "—";

const getComponents = (result) =>
  result?.projectPlan?.components?.length ??
  result?.frontend?.componentsGenerated ??
  "—";
const navigate = useNavigate();
export default function PreviewPanel() {
  const { result, isGenerating, notify } = useBuilder();

  const handlePreview = async () => {
    try {
      const data = await previewWebsite();

      if (data.success) {
        notify("Preview started successfully.");

        navigate("/preview", {
          state: {
            previewUrl: data.previewUrl,
            projectName: getName(result),
          },
        });
      } else {
        notify(data.message || "Unable to start preview.", "error");
      }
    } catch (error) {
      notify(
        error.response?.data?.message ||
        error.message ||
        "Unable to start preview.",
        "error"
      );
    }
  };

  const handleDownload = () => {
    notify(
      "Download API will be connected in the next step.",
      "error"
    );
  };

  return (
    <main className="main-panel">
      <header className="topbar">
        <div className="topbar-label">
          <SparklesIcon />
          <span>Workspace / New Project</span>
        </div>

        <div className={`status-pill ${isGenerating ? "active" : ""}`}>
          <span className="status-dot" />
          {isGenerating
            ? "Building"
            : result
              ? "Complete"
              : "Ready"}
        </div>
      </header>

      <section className="preview-surface">
        {!result ? (
          <div className="empty-preview">
            <div className="empty-icon">
              <LayoutIcon />
            </div>

            <h2>
              {isGenerating
                ? "Your website is taking shape..."
                : "Your generated website preview will appear here."}
            </h2>

            <p>
              {isGenerating
                ? "The AI agent team is planning your project and generating the frontend."
                : "Enter your website requirements on the left and click Generate Website."}
            </p>
          </div>
        ) : (
          <div className="result-card">
            <div className="result-hero">
              <div className="success-line">
                <span className="success-check">
                  <CheckIcon />
                </span>

                {result.frontend?.message ||
                  "Frontend project generated successfully."}
              </div>

              <h2>{getName(result)}</h2>

              <p>Your project is ready for its next step.</p>
            </div>

            <div className="result-details">
              <div className="detail">
                <span>Framework</span>
                <strong>React + Vite</strong>
              </div>

              <div className="detail">
                <span>Pages Generated</span>
                <strong>{getPages(result)}</strong>
              </div>

              <div className="detail">
                <span>Components</span>
                <strong>{getComponents(result)}</strong>
              </div>
            </div>

            <div className="result-actions">
              <button
                type="button"
                className="primary-button"
                onClick={handlePreview}
              >
                Preview Website
                <ArrowIcon />
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={handleDownload}
              >
                <DownloadIcon />
                Download Project
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}