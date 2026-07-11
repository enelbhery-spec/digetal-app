// src/lib/marketMapping.js

export const categoryMapping = {
  101: {
    name: "سماعات لاسلكية",
    competitors: {
      amazon: { baseUrl: "https://www.amazon.eg/s?k=wireless+headphones" },
      noon: { baseUrl: "https://www.noon.com/egypt-ar/electronics/audio-headphones/wireless-headphones/" }
    }
  },
  102: {
    name: "ساعات ذكية",
    competitors: {
      amazon: { baseUrl: "https://www.amazon.eg/s?k=smart+watch" },
      noon: { baseUrl: "https://www.noon.com/egypt-ar/electronics/wearables/smart-watches/" }
    }
  }
};

export function getCompetitorUrls(categoryId) {
  return categoryMapping[categoryId]?.competitors || null;
}