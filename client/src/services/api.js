import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================
// Generate Website
// ======================

export const generateWebsite = async (prompt) => {
  const { data } = await api.post("/generate", {
    prompt,
  });

  return data;
};

// ======================
// Preview Website
// ======================

export const previewWebsite = async () => {
  const { data } = await api.post("/preview");

  return data;
};

export default api;