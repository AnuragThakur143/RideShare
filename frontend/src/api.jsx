const API_BASE = "http://localhost:8080";

export async function apiRequest(
  path,
  method = "GET",
  body = null,
  token = null
) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("API error response:", text);
    throw new Error(text || "Unknown error");
  }

  try {
    return JSON.parse(text); // this is the key change!
  } catch (e) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Invalid JSON response from server");
  }
}
