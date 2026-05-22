export async function safkaFetch(endpoint: string, options: RequestInit = {}) {
  const API_SAFKA_KEY = process.env.API_SAFKA_KEY;

  if (!API_SAFKA_KEY) {
    throw new Error("API_SAFKA_KEY is missing in environment variables");
  }

  const response = await fetch(`https://public-api.safka-eg.com/v1${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${API_SAFKA_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to connect to Safka API");
  }

  return response.json();
}