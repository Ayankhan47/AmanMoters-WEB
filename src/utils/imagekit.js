import api from "../api/axios";

/**
 * Uploads a file to the backend, which sends it to ImageKit.
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The uploaded image URL
 */
export async function uploadToImageKit(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  // Add more fields if your backend/ImageKit setup requires
  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url;
}
