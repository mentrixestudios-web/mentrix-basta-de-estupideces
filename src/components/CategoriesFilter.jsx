import React from 'react';
import { CATEGORIES } from '../data/cards';
import { Sparkles, Layers } from 'lucide-react';

export function CategoriesFilter({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1 py-1">
      {/* All Categories Option */}
      <button
        onClick={() => setActiveCategory('all')}
        className={`px-3.5 py-1.5 rounded-xl border-2 font-comic text-sm tracking-wide shrink-0 transition flex items-center gap-1.5 ${
          activeCategory === 'all'
            ? 'bg-yellow-400 text-black border-black shadow-pop font-bold'
            : 'bg-[#211A34] text-gray-300 border-purple-500/30 hover:border-yellow-400/50'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        <span>TODAS LAS CARTAS</span>
      </button>

      {/* Each Category */}
      {Object.values(CATEGORIES).map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl border-2 font-comic text-xs tracking-wide shrink-0 transition flex items-center gap-1 ${
              isActive
                ? 'text-black border-black shadow-pop font-bold'
                : 'bg-[#211A34] text-gray-300 border-purple-500/30 hover:border-white/30'
            }`}
            style={{
              backgroundColor: isActive ? cat.color : undefined
            }}
          >
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
