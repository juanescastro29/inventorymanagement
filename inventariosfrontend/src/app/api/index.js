import axios from "axios";

export const apiURL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: apiURL,
});

export const getResponseData = (resp) => resp.data;

export const escalateError = (err) => {
  let errorFromResponse;
  let errorFromResponseScheduler;
  try {
    errorFromResponse = err.response.data.error;
    errorFromResponseScheduler = err.response.data.message;
  } catch (e) {
    errorFromResponse = undefined;
  }
  const finalValidation =
    typeof err === "string" ? err : err.toString() || "Error Inesperado";
  const newErr = new Error(
    errorFromResponse ||
      errorFromResponseScheduler ||
      (err instanceof Error ? err.message || err.toString() : finalValidation)
  );
  try {
    newErr.data = err.response.data;
  } catch (e) {}
  throw newErr;
};