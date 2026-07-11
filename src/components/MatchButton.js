'use client'
import { useState } from 'react';
import { matchAndGetPrice } from '@/app/actions/matchProduct';

export default function MatchButton({ productId, tableType }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const data = await matchAndGetPrice(productId, tableType);
      if (data.success) {
        setResult(`تمت المطابقة بنسبة ${data.score}%`);
      }
    } catch (err) {
      alert("خطأ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleMatch} 
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'جاري التحليل...' : 'مقارنة السعر'}
      </button>
      {result && <p className="text-sm mt-1">{result}</p>}
    </div>
  );
}