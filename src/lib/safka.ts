export async function safkaFetch(endpoint: string, options: RequestInit = {}) {
  const SAFKA_API_KEY = process.env.SAFKA_API_KEY;

  if (!SAFKA_API_KEY) {
    throw new Error("SAFKA_API_KEY is missing in environment variables");
  }

  const response = await fetch(`https://public-api.safka-eg.com/v1${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${SAFKA_API_KEY}`,
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