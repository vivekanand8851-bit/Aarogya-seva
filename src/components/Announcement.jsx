import React, { useEffect, useState } from 'react';
import { ANNOUNCEMENT_MESSAGES } from '../mock/mockData';
import { Tag } from 'lucide-react';

export default function Announcement() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full bg-[#0f3d2e] text-[#f4e9d3] text-[13px] tracking-wide">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 overflow-hidden">
        <Tag size={14} className="text-[#e6b64c]" />
        <span key={idx} className="animate-[fadeIn_.4s_ease] text-center">
          {ANNOUNCEMENT_MESSAGES[idx]}
        </span>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
