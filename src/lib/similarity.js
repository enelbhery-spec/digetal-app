// src/lib/similarity.js
export function getSimilarityScore(text1, text2) {
    if (!text1 || !text2) return 0;

    const clean = (str) => str.toLowerCase().replace(/[^\w\s\u0621-\u064A]/g, '').split(/\s+/).filter(w => w.length > 2);
    
    const words1 = clean(text1);
    const words2 = clean(text2);
    
    const getFreq = (words) => {
        const freq = {};
        words.forEach(w => freq[w] = (freq[w] || 0) + 1);
        return freq;
    };

    const freq1 = getFreq(words1);
    const freq2 = getFreq(words2);

    let dotProduct = 0;
    for (let word in freq1) {
        if (freq2[word]) dotProduct += freq1[word] * freq2[word];
    }

    const mag1 = Math.sqrt(Object.values(freq1).reduce((acc, v) => acc + v * v, 0));
    const mag2 = Math.sqrt(Object.values(freq2).reduce((acc, v) => acc + v * v, 0));

    if (mag1 === 0 || mag2 === 0) return 0;
    return dotProduct / (mag1 * mag2);
}